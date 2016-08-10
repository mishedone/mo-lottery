function HotColdTrendAnalyser(periodCount, periodSize) {
    this.periodCount = periodCount;
    this.periodSize = periodSize;
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        var analyser = this;

        this.game = game;
        this.result = [];
        this.map = {};

        // create number index map
        _.each(this.game.get('numbers'), function (number, index) {
            analyser.map[number] = index;
        });
    },

    getNumberIndex: function (number) {
        return this.map[number];
    },

    createPeriod: function () {
        var period = {
            stats: [],
            drawCount: 0,
            averageHit: 0
        };

        // add each number structure to stats
        _.each(this.game.get('numbers'), function (number) {
            period.stats.push({
                number: number,
                hits: 0
            });
        });

        return period;
    },

    analyse: function (game, success) {
        var analyser = this;

        this.reset(game);
        this.game.load(function () {
            analyser.run();
            success(analyser.result);
        });
    },

    run: function () {
        var analyser = this, done = {}, reverseYears, currentPeriod = this.createPeriod();

        reverseYears = analyser.game.get('years').slice(0);
        reverseYears.reverse();

        try {
            _.each(reverseYears, function (year) {
                var reverseDraws;

                reverseDraws = analyser.game.getDraws(year).slice(0);
                reverseDraws.reverse();

                _.each(reverseDraws, function (draw) {
                    if (currentPeriod.drawCount == analyser.periodSize) {
                        analyser.addPeriod(currentPeriod);
                        
                        if (analyser.result.length == analyser.periodCount) {
                            throw done;
                        }

                        currentPeriod = analyser.createPeriod();
                    }

                    // increment current period draw count
                    currentPeriod.drawCount++;

                    // hit
                    _.each(draw, function (number) {
                        analyser.hit(currentPeriod, number);
                    });
                });
            });

            analyser.addPeriod(currentPeriod);
        } catch (error) {
            if (error !== done) {
                throw error;
            }
        }
    },
    
    hit: function (period, number) {
        period.stats[this.getNumberIndex(number)].hits++;
    },
    
    addPeriod: function (period) {
        this.calculateRanks(period);
        this.calculateAverageHits(period);
        this.result.push(period);
    },
    
    calculateRanks: function (period) {
        var currentRank = 0, lastHits = 0, hitsWithSameRank = 1;

        // sort ranks by hits in a reverse order
        period.stats.sort(function (a, b) {
            return a.hits - b.hits;
        });
        period.stats.reverse();

        // calculate ranks
        _.each(period.stats, function (data, index) {
            if (lastHits != data.hits) {
                currentRank = currentRank + hitsWithSameRank;
                hitsWithSameRank = 1;
            } else {
                hitsWithSameRank++;
            }
            
            lastHits = data.hits;
            period.stats[index].rank = currentRank;
        });
    },

    calculateAverageHits: function (period) {
        period.averageHit = Math.round(
            (period.drawCount * this.game.get('drawSize')) /
            this.game.get('numbers').length
        );
    }
};
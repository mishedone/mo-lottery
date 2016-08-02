function HotColdTrendAnalyser(periodCount, periodSize) {
    this.periodCount = periodCount;
    this.periodSize = periodSize;
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.result = [];
    },

    getNumberIndex: function (number) {
        return number - 1;
    },

    getPeriod: function () {
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

    analyse: function (game) {
        var analyser = this;

        this.reset(game);
        this.game.load(function () {
            analyser.run();
        });
    },

    run: function () {
        var analyser = this, done = {}, reverseYears, currentPeriod = this.getPeriod();

        reverseYears = analyser.game.get('years').slice(0);
        reverseYears.reverse();

        try {
            _.each(reverseYears, function (year) {
                var reverseDraws;

                reverseDraws = analyser.game.getDraws(year).slice(0);
                reverseDraws.reverse();

                _.each(reverseDraws, function (draw) {
                    if (currentPeriod.drawCount == analyser.periodSize) {
                        analyser.calculateRanks(currentPeriod);
                        analyser.calculateAverageHits(currentPeriod);
                        analyser.result.push(currentPeriod);

                        if (analyser.result.length == analyser.periodCount) {
                            throw done;
                        }

                        currentPeriod = analyser.getPeriod();
                    }

                    // increment current period draw count
                    currentPeriod.drawCount++;

                    // hit
                    _.each(draw, function (number) {
                        analyser.hit(currentPeriod, number);
                    });
                });
            });

            analyser.calculateRanks(currentPeriod);
            analyser.calculateAverageHits(currentPeriod);
            analyser.result.push(currentPeriod);
        } catch (error) {
            if (error !== done) {
                throw error;
            }
        }
    },
    
    hit: function (period, number) {
        period.stats[this.getNumberIndex(number)].hits++;
    },
    
    calculateRanks: function (period) {
        var analyser = this, currentRank = 0, lastHits = 0, hitsWithSameRank = 1;
        
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
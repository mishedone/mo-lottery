function HotColdTrendPeriods() {}

HotColdTrendPeriods.prototype = {
    constructor: HotColdTrendPeriods,
    
    get: function (numbers, draws, periodCount) {
        var self = this;
        
        // parameters
        this.numbers = numbers;
        this.drawSize = draws[0].length;
        this.draws = draws;
        
        // periods data
        this.periodCount = periodCount;
        this.periodSize = this.draws.length / this.periodCount;
        this.periods = [];

        // number index map
        this.numberMap = {};
        _.each(this.numbers, function (number, index) {
            self.numberMap[number] = index;
        });
        
        this.buildPeriods();
        
        return this.periods;
    },
    
    buildPeriods: function () {
        var analyser = this, done = {}, currentPeriod = this.createPeriod();

        try {
            _.each(this.draws, function (draw) {
                if (currentPeriod.drawCount == analyser.periodSize) {
                    analyser.addPeriod(currentPeriod);
                    
                    if (analyser.periods.length == analyser.periodCount) {
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

            analyser.addPeriod(currentPeriod);
        } catch (error) {
            if (error !== done) {
                throw error;
            }
        }
    },

    createPeriod: function () {
        var period = {
            stats: [],
            drawCount: 0,
            averageHit: 0
        };

        // add each number structure to stats
        _.each(this.numbers, function (number) {
            period.stats.push({
                number: number,
                hits: 0
            });
        });

        return period;
    },
    
    addPeriod: function (period) {
        this.calculateRanks(period);
        this.calculateAverageHits(period);
        this.periods.push(period);
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
            (period.drawCount * this.drawSize) /
            this.numbers.length
        );
    },
    
    hit: function (period, number) {
        period.stats[this.getNumberIndex(number)].hits++;
    },
    
    getNumberIndex: function (number) {
        return this.numberMap[number];
    }
};
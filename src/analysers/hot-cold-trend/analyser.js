function HotColdTrendAnalyser() {}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.result = {
            periods: [],
            hits: [],
            ranks: [],
            totalDraws: 0,
            averageHits: 0
        };
        this.initializePeriods();
    },
    
    initializePeriods: function () {
        var analyser = this;
        
        _.each(analyser.game.get('numbers'), function (number) {
            analyser.result.periods.push({
                number: number,
                hits: 0
            });
        });
    },
    
    getNumberIndex: function (number) {
        return number - 1;
    },

    analyse: function (game) {
        var analyser = this;

        this.reset(game);
        this.game.load(function () {
            analyser.run();
        });
    },

    run: function () {
        var analyser = this;

        _.each(analyser.game.get('years'), function (year) {
            analyser.game.getDraws(year).forEach(function (draw) {
                analyser.result.totalDraws++;

                // hit
                _.each(draw, function (number) {
                    analyser.hit(number);
                });
            });
        });

        analyser.determineRanks();
        analyser.calculateRanks();
        analyser.calculateAverageHits();
    },
    
    hit: function (number) {
        if (!this.result.hits.hasOwnProperty(number)) {
            this.result.hits[number] = 0;
        }

        this.result.hits[number]++;
        this.result.periods[this.getNumberIndex(number)].hits++;
    },

    determineRanks: function () {
        var analyser = this, ranks = [], currentRank = 0, lastHits = 0, hitsWithSameRank = 1;

        // fill in ranks with data
        _.each(this.result.hits, function (hits, number) {
            ranks.push([number, analyser.result.hits[number]]);
        });

        // sort ranks by hits in a reverse order
        ranks.sort(function (a, b) {
            return a[1] - b[1]
        });
        ranks.reverse();

        // assign ranks
        _.each(ranks, function (rankData, index) {
            if (lastHits != rankData[1]) {
                currentRank = currentRank + hitsWithSameRank;
                hitsWithSameRank = 1;
            } else {
                hitsWithSameRank++;
            }

            lastHits = rankData[1];
            ranks[index].push(currentRank);
        });

        this.result.ranks = ranks;
    },
    
    calculateRanks: function () {
        var analyser = this, period, currentRank = 0, lastHits = 0, hitsWithSameRank = 1;
        
        // sort ranks by hits in a reverse order
        period = analyser.result.periods;
        period.sort(function (a, b) {
            return a.hits - b.hits;
        });
        period.reverse();
        
        // calculate ranks
        _.each(period, function (data, index) {
            if (lastHits != data.hits) {
                currentRank = currentRank + hitsWithSameRank;
                hitsWithSameRank = 1;
            } else {
                hitsWithSameRank++;
            }
            
            lastHits = data.hits;
            period[index].rank = currentRank;
        });
    },

    calculateAverageHits: function () {
        this.result.averageHits = (this.result.totalDraws * this.game.get('drawSize')) / this.game.get('numbers').length;
    }
};
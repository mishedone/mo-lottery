function HotColdTrendAnalyser() {
    this.reset({});
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.result = {
            hits: {},
            ranks: [],
            totalDraws: 0,
            averageHits: 0
        };
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
        analyser.calculateAverageHits();
    },
    
    hit: function (number) {
        if (!this.result.hits.hasOwnProperty(number)) {
            this.result.hits[number] = 0;
        }

        this.result.hits[number]++;
    },

    determineRanks: function () {
        var analyser = this, ranks = [];

        _.each(this.result.hits, function (hits, number) {
            ranks.push([number, analyser.result.hits[number]]);
        });

        ranks.sort(function (a, b) {
            return a[1] - b[1]
        });
        ranks.reverse();

        this.result.ranks = ranks;
    },

    calculateAverageHits: function () {
        this.result.averageHits = (this.result.totalDraws * this.game.get('drawSize')) / this.game.get('numbers').length;
    }
};
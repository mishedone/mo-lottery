function HotColdTrendAnalyser() {
    this.reset({});
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.result = {
            hits: {},
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

        analyser.calculateAverageHits();
    },
    
    hit: function (number) {
        if (!this.result.hits.hasOwnProperty(number)) {
            this.result.hits[number] = 0;
        }
        this.result.hits[number]++;
    },

    calculateAverageHits: function () {
        this.result.averageHits = (this.result.totalDraws * this.game.get('drawSize')) / this.game.get('numbers').length;
    }
};
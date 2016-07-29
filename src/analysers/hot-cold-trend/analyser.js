function HotColdTrendAnalyser() {
    this.reset({});
}

HotColdTrendAnalyser.prototype = _.extend({}, Backbone.Events, {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.hits = {};
        this.totalDraws = 0;
        this.averageHits = 0;
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
                analyser.totalDraws++;

                // hit
                _.each(draw.get('draw'), function (number) {
                    analyser.hit(number);
                });
            });
        });

        analyser.calculateAverageHits();
        analyser.trigger('game:analysed');
    },
    
    hit: function (number) {
        if (!this.hits.hasOwnProperty(number)) {
            this.hits[number] = 0;
        }
        this.hits[number]++;
    },

    calculateAverageHits: function () {
        this.averageHits = (this.totalDraws * this.game.get('drawSize')) / this.game.get('numbers').length;
    }
});
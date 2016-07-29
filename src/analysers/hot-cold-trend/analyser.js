function HotColdTrendAnalyser(gameLoader, periodSize) {
    this.reset({});
    this.gameLoader = gameLoader;
    this.periodSize = periodSize;
}

HotColdTrendAnalyser.prototype = _.extend({}, Backbone.Events, {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.hits = {};
        this.drawCount = 0;
    },

    analyse: function (game) {
        var analyser = this;

        this.reset(game);
        this.gameLoader.load(game, function () {
            analyser.analyseDraws();
        });
    },

    analyseDraws: function () {
        var analyser = this, game = this.game;

        game.get('years').forEach(function (year) {
            game.getDraws(year.get('year')).forEach(function (draw) {
                analyser.drawCount++;
                _.each(draw.get('draw'), function (number) {
                    analyser.hit(number);
                });
            });
        });

        analyser.trigger('game:analysed');
    },
    
    hit: function (number) {
        if (!this.hits.hasOwnProperty(number)) {
            this.hits[number] = 0;
        }
        this.hits[number]++;
    }
});
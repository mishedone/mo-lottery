function HotColdTrendAnalyser(gameLoader, periodSize) {
    var analyser = this;

    this.reset({});
    this.gameLoader = gameLoader;
    this.periodSize = periodSize;
    this.name = 'hot-cold-trend-analyser';
    
    // listen to game loader loaded events
    this.listenTo(this.gameLoader, 'game:loaded', function (caller) {
        if (analyser.name == caller) {
            analyser.analyseDraws()
        }
    });
}

HotColdTrendAnalyser.prototype = _.extend({}, Backbone.Events, {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.hits = {};
        this.drawCount = 0;
    },

    analyse: function (game) {
        this.reset(game);
        this.gameLoader.load(game, this.name);
    },

    analyseDraws: function () {
        var analyser = this;

        analyser.game.get('years').forEach(function (year) {
            analyser.game.getDraws(year.get('year')).forEach(function (draw) {
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
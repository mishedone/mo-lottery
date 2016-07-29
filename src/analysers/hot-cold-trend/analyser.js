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
        this.periods = {};
        this.drawCount = 0;
        this.currentPeriod = 0;
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

                // recalculate current period
                if (analyser.drawCount % analyser.periodSize == 0) {
                    analyser.currentPeriod++;
                }

                // hit
                _.each(draw.get('draw'), function (number) {
                    analyser.hit(number);
                });
            });
        });

        analyser.trigger('game:analysed');
    },
    
    hit: function (number) {
        // add to hits
        if (!this.hits.hasOwnProperty(number)) {
            this.hits[number] = 0;
        }
        this.hits[number]++;

        // add to periods
        if (!this.periods.hasOwnProperty(this.currentPeriod)) {
            this.periods[this.currentPeriod] = {};
        }
        if (!this.periods[this.currentPeriod].hasOwnProperty(number)) {
            this.periods[this.currentPeriod][number] = 0;
        }
        this.periods[this.currentPeriod][number]++;
    }
});
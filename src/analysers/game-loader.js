function GameLoader() {
    this.reset({});
}

GameLoader.prototype = _.extend({}, Backbone.Events, {
    constructor: GameLoader,
    
    reset: function (game) {
        this.game = game;
    },
    
    load: function (game, caller) {
        var loader = this;

        loader.reset(game);
        loader.game.loadYears(function () {
            var years, lastYear;

            years = loader.game.get('years');
            lastYear = years.last().get('year');

            // load each year's draws
            years.forEach(function (year) {
                loader.game.loadDraws(year.get('year'), function () {
                    if (lastYear == year.get('year')) {
                        loader.trigger('game:loaded', caller);
                    }
                });
            });
        });
    }
});
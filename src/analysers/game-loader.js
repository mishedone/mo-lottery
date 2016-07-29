function GameLoader() {}

GameLoader.prototype = _.extend({}, Backbone.Events, {
    constructor: GameLoader,

    load: function (game, caller) {
        var loader = this;

        game.loadYears(function () {
            var years, lastYear;

            years = game.get('years');
            lastYear = years.last().get('year');

            // load each year's draws
            years.forEach(function (year) {
                game.loadDraws(year.get('year'), function () {
                    if (lastYear == year.get('year')) {
                        loader.trigger('game:loaded', caller);
                    }
                });
            });
        });
    }
});
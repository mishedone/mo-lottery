function GameLoader() {}

GameLoader.prototype = {
    constructor: GameLoader,

    load: function (game, success) {
        var loader = this;

        game.loadYears(function () {
            var years, lastYear;

            years = game.get('years');
            lastYear = years.last().get('year');

            // load each year's draws
            years.forEach(function (year) {
                game.loadDraws(year.get('year'), function () {
                    if (lastYear == year.get('year')) {
                        success();
                    }
                });
            });
        });
    }
};
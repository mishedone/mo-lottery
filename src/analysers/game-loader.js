function GameLoader() {}

GameLoader.prototype = {
    constructor: GameLoader,

    load: function (game, success) {
        game.loadYears(function () {
            var years, loadedDraws = 0;

            years = game.get('years');
            years.forEach(function (year) {
                game.loadDraws(year.get('year'), function () {
                    loadedDraws++;
                    if (loadedDraws == years.length) {
                        success();
                    }
                });
            });
        });
    }
};
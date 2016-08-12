var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        drawSize: null,
        possibleDraws: 0,
        numbers: [],
        years: []
    },

    initialize: function () {
        this.drawsStorage = new GameDrawsStorage(this);
    },

    load: function (success) {
        var game = this, loadedDraws = 0;

        _.each(game.get('years'), function (year) {
            game.loadDraws(year, function () {
                loadedDraws++;
                if (loadedDraws == game.get('years').length) {
                    success();
                }
            });
        });
    },

    loadDraws: function (year, success) {
        var game, currentYear;

        game = this;
        currentYear = new Date().getFullYear();

        if (currentYear != year  && game.getDraws(year)) {
            return success();
        }

        // load draws for wanted year (current year is always reloaded)
        $.get(game.getDrawsUrl(year), function (draws) {
            game.drawsStorage.set(year, draws);
            success();
        });
    },

    getDraws: function (year) {
        return this.drawsStorage.get(year);
    },

    getDrawsUrl: function (year) {
        return '/api/draws/' + this.get('id') + '/' + year;
    }
});
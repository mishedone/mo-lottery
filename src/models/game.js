var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        drawSize: null,
        numbers: [],
        years: []
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
            var key = game.getDrawsKey(year);

            game.set(key, draws);
            success();
        });
    },

    getDraws: function (year) {
        var key = this.getDrawsKey(year);

        return (typeof this.get(key) == undefined) ? null : this.get(key);
    },

    getDrawsUrl: function (year) {
        return '/api/draws/' + this.get('id') + '/' + year;
    },

    getDrawsKey: function (year) {
        return 'draws:' + year;
    }
});
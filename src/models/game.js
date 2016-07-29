var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        drawSize: null,
        numbers: [],
        years: [],
        draws: {}
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
        var game, draws, currentYear;

        game = this;
        draws = this.get('draws');
        currentYear = new Date().getFullYear();

        if (currentYear != year  && draws.hasOwnProperty(year)) {
            return success();
        }

        // load draws for wanted year (current year is always reloaded)
        draws[year] = new DrawCollection(null, {gameId: this.get('id'), year: year});
        draws[year].fetch({
            success: function () {
                game.set('draws', draws);
                success();
            }
        });
    },

    getDraws: function (year) {
        return this.get('draws')[year];
    }
});
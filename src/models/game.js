var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        years: {},
        draws: {}
    },

    loadYears: function (success) {
        if (this.get('years').length) {
            return success();
        }

        // load years
        this.set('years', new YearCollection(null, {gameId: this.get('id')}));
        this.get('years').fetch({success: success});
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
var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        years: {},
        draws: {}
    },

    loadYears: function (success) {
        this.set('years', new YearCollection(null, {gameId: this.get('id')}));
        this.get('years').fetch({success: success});
    },

    loadDraws: function (year, success) {
        var game = this, draws = this.get('draws');
        draws[year] = new DrawCollection(null, {gameId: this.get('id'), year: year});
        draws[year].fetch({
            success: function () {
                game.set('draws', draws);
                success();
            }
        });
    },

    getDraw: function (year) {
        return this.get('draws')[year];
    }
});
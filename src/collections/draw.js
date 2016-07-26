var DrawCollection = Backbone.Collection.extend({
    model: DrawModel,
    game: {},
    year: {},

    initialize: function (models, options) {
        this.game = options.game;
        this.year = options.year;
    },

    url: function () {
        return '/api/draws/' + this.game.get('id') + '/' + this.year.get('year');
    }
});
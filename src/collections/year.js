var YearCollection = Backbone.Collection.extend({
    model: YearModel,
    game: {},

    initialize: function (models, options) {
        this.game = options.game;
    },

    url: function () {
        return '/api/years/' + this.game.get('id')
    }
});
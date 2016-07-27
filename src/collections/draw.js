var DrawCollection = Backbone.Collection.extend({
    model: DrawModel,
    gameId: {},
    year: {},

    initialize: function (models, options) {
        this.gameId = options.gameId;
        this.year = options.year;
    },

    url: function () {
        return '/api/draws/' + this.gameId + '/' + this.year;
    }
});
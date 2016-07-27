var YearCollection = Backbone.Collection.extend({
    model: YearModel,
    gameId: null,

    initialize: function (models, options) {
        this.gameId = options.gameId;
    },

    url: function () {
        return '/api/years/' + this.gameId;
    }
});
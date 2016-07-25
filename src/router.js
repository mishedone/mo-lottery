var Router = Backbone.Router.extend({
    games: {},

    routes: {
        '': 'index',
        'browse/:id': 'browse'
    },

    initialize: function (options) {
        this.games = options.games;
    },

    index: function () {
        // TODO: redirect to last game browse page
    },

    browse: function (id) {
        var view = new BrowseView({
            el: '#content-slot',
            game: this.games.findWhere({
                id: id
            })
        });
        view.render();
    }
});
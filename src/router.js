var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'browse/:id': 'browse'
    },

    initialize: function (options) {
        this.games = options.games;
        this.lastGame = options.lastGame;
    },

    index: function () {
        this.navigate('browse/' + this.lastGame.get('id'));
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
var Router = Backbone.Router.extend({
    games: {},
    initGame: {},

    routes: {
        '': 'index',
        'browse/:id': 'browse'
    },

    initialize: function (options) {
        this.games = options.games;
        this.initGame = options.initGame;
    },

    index: function () {
        this.navigate('browse/' + this.initGame.get('id'));
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
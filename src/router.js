var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'browse/:id': 'browseYears'
    },

    initialize: function (options) {
        this.games = options.games;
        this.lastGame = options.lastGame;
    },

    findGame: function (id) {
        var game = this.games.findWhere({id: id});
        this.trigger('game:found', game);

        return game;
    },

    index: function () {
        this.navigate('browse/' + this.lastGame.get('id'), {trigger: true});
    },

    browseYears: function (id) {
        var view, years;

        years = new YearCollection(null, {game: this.findGame(id)});
        years.fetch({
            success: function (years) {
                view = new BrowseYearsView({
                    el: '#content-slot',
                    years: years
                });
                view.render();
            }
        });
    }
});
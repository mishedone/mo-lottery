var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'browse/:id': 'browseYears',
        'browse/:id/:year': 'browseDraws'
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
        var game = this.findGame(id), view, suggestions;

        suggestions = new HotColdTrendSuggestions();

        view = new BrowseYearsView({
            el: '#content-slot',
            game: game,
            suggestions: suggestions
        });
        view.render();
    },

    browseDraws: function (id, year) {
        var game = this.findGame(id);

        game.loadDraws(year, function () {
            view = new BrowseDrawsView({
                el: '#content-slot',
                game: game,
                year: year
            });
            view.render();
        });
    }
});
var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'suggestions/:id': 'suggestions',
        'browse/:id': 'browse',
        'browse/:id/:year': 'browse'
    },

    initialize: function (options) {
        this.games = options.games;
        this.lastGame = options.lastGame;
    },

    findGame: function (id) {
        var game = this.games.findWhere({id: id});
        this.trigger('game:changed', game);

        return game;
    },

    index: function () {
        this.navigate('suggestions/' + this.lastGame.get('id'), {trigger: true});
    },
    
    suggestions: function (id) {
        var game = this.findGame(id), view, suggestions;
        
        view = new SuggestionsView({
            el: '#content-slot'
        });
        view.render();
        
        suggestions = new HotColdTrendSuggestions();
        suggestions.get(game, function (numbers) {
            view.renderSuggestions(numbers);
        });
    },

    browse: function (id, year) {
        var game = this.findGame(id), view;

        if (year == undefined) {
            year = _.last(game.get('years'));
        }

        game.loadDraws(year, function () {
            view = new BrowseView({
                el: '#content-slot',
                game: game,
                year: year
            });
            view.render();
        });
    }
});
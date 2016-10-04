var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'suggestions/:id': 'suggestions',
        'tests/:id': 'tests',
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
        var game = this.findGame(id), view;
        
        view = new SuggestionsView({
            el: '#content-slot'
        });
        view.render();
        
        game.load(function () {
            var draws, periods, suggestions;
            
            draws = game.getAllDraws();
            draws.reverse();
            
            periods = new HotColdTrendPeriodFactory();
            suggestions = new HotColdTrendSuggestionFactory();
            
            view.renderSuggestions(suggestions.get(
                periods.get(
                    game.get('numbers'),
                    draws.slice(0, 96),
                    12
                ),
                game.get('drawSize')
            ));
        });
    },
    
    tests: function (id) {
        var game = this.findGame(id), view;
        
        view = new SuggestionsView({
            el: '#content-slot'
        });
        view.render();
        
        game.load(function () {
            var draws, lastDraw, currentStart, periods, suggestions, numbers, limit, hitCount, result = {};
            
            draws = game.getAllDraws();
            draws.reverse();
            
            periods = new HotColdTrendPeriodFactory();
            suggestions = new HotColdTrendSuggestionFactory();
            
            limit = 1;
            currentStart = 1;
            while (limit < 1000) {
                hitCount = 0;
                lastDraw = draws[currentStart - 1];
                numbers = suggestions.get(
                    periods.get(
                        game.get('numbers'),
                        draws.slice(currentStart, currentStart + 120),
                        12
                    ),
                    game.get('drawSize')
                );
                
                _.each(numbers, function (number) {
                    if (lastDraw.indexOf(number) >= 0) {
                        hitCount++;
                    }
                });
                
                if (!result.hasOwnProperty(hitCount)) {
                    result[hitCount] = 0;
                }
                result[hitCount]++;
                
                limit++;
                currentStart++;
            }
            
            console.log(result);
        });
    },

    browse: function (id, year) {
        var game = this.findGame(id), view;

        if (year == undefined) {
            year = _.last(game.get('years'));
        }

        view = new BrowseView({
            el: '#content-slot',
            game: game,
            year: year
        });
        view.render();

        game.loadDraws(year, function () {
            view.renderDraws();
        });
    }
});
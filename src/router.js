var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'suggestions/:id': 'suggestions',
        'audit/:id': 'audit',
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
        this.navigate('#/suggestions/' + this.lastGame.get('id'), {trigger: true});
    },
    
    suggestions: function (id) {
        var game = this.findGame(id), view;
        
        view = new SuggestionsView({
            el: '#content-slot'
        });
        view.render();
        
        game.load(function () {
            var suggestions = new AnalyserSuggestions(
                game.get('numbers'),
                game.getAllDraws(),
                game.get('drawSize'),
                {
                    hotColdTrend: {
                        drawsPerPeriod: game.get('hotColdTrendDrawsPerPeriod'),
                        periodCount: 12
                    }
                }
            );

            view.renderNumbers(
                suggestions.getHotColdTrend(),
                suggestions.getElapseTimeTrend(),
                suggestions.getElapseTimeTrendGaps()
            );
        });
    },
    
    audit: function (id) {
        var game = this.findGame(id), view;
        
        view = new AuditView({
            el: '#content-slot'
        });
        view.render();
        
        game.load(function () {
            var tableBuilder = new AuditTableBuilder(game);
            
            view.renderTables([
                tableBuilder.getHotColdTrendTable(),
                tableBuilder.getElapseTimeTrendTable(),
                tableBuilder.getElapseTimeTrendGapsTable()
            ]);
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
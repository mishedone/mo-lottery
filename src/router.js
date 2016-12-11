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
        this.auditTableBuilder = new AuditTableBuilder();
        this.auditWinnersStorage = new AuditWinnersStorage();
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
        var game = this.findGame(id), view, 
            auditWinners, lastAuditWinner, hasLastAuditWinner,
            winningAlgorithm, auditTable;
        
        auditWinners = this.auditWinnersStorage.get(game);
        lastAuditWinner = this.auditWinnersStorage.getLast(game);
        auditTable = this.auditTableBuilder.restore(game, auditWinners);
        
        hasLastAuditWinner = (typeof lastAuditWinner != 'undefined');
        winningAlgorithm = (hasLastAuditWinner) ? lastAuditWinner.getAlgorithm() : 'getHotColdTrend';
        
        view = new SuggestionsView({
            el: '#content-slot',
            algorithm: winningAlgorithm,
            auditTable: auditTable
        });
        view.render();
        
        game.load(function () {
            var suggestions, suggestionsConfig;

            suggestionsConfig = _.extend({
                elapseTimeTrend: {
                    drawsPerPeriod: 100
                },
                hotColdTrend: {
                    periodCount: 12,
                    drawsPerPeriod: 10
                }
            }, (hasLastAuditWinner) ? lastAuditWinner.getSuggestionsConfig() : {});
            
            suggestions = new AnalyserSuggestions(
                game.get('numbers'),
                game.getAllDraws(),
                game.get('drawSize'),
                suggestionsConfig
            );
            
            view.renderSuggestions(suggestions[winningAlgorithm]());
        });
    },
    
    audit: function (id) {
        var game = this.findGame(id), view, self = this;
        
        view = new AuditView({
            el: '#content-slot'
        });
        
        game.load(function () {
            var table = self.auditTableBuilder.get(game);

            self.auditWinnersStorage.set(game, table.getWinner());
            
            view.render(table);
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
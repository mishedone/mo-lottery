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
        auditTable = new AuditTable('Audit Winners', game.get('drawSize'));
        auditTable.addRows(auditWinners);
        
        hasLastAuditWinner = (typeof lastAuditWinner != 'undefined');
        winningAlgorithm = (hasLastAuditWinner) ? lastAuditWinner.getAlgorithm() : 'getHotColdTrend';
        
        view = new SuggestionsView({
            el: '#content-slot',
            algorithm: winningAlgorithm,
            auditTable: auditTable
        });
        view.render();
        
        game.load(function () {
            var suggestions;
            
            suggestions = new AnalyserSuggestions(
                game.get('numbers'),
                game.getAllDraws(),
                game.get('drawSize'),
                (hasLastAuditWinner) ? lastAuditWinner.getSuggestionsConfig() : {}
            );
            
            view.renderSuggestions(suggestions[winningAlgorithm]());
        });
    },
    
    audit: function (id) {
        var game = this.findGame(id), view, self = this;
        
        view = new AuditView({
            el: '#content-slot'
        });
        view.render();
        
        game.load(function () {
            // TODO: move this logic in app on audit run
            /*var table = .get(
                game.get('numbers'),
                game.get('drawSize'),
                game.get('drawsPerWeek'),
                game.getAllDraws()
            );

            self.auditWinnersStorage.set(game, table.getWinner());

            view.renderTable(table);*/
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
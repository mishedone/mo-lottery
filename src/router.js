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
            var numbers, draws, drawSize, drawsPerPeriod, hotColdTrend, elapseTimeTrend, temp;
            
            numbers = game.get('numbers');
            draws = game.getAllDraws();
            drawSize = game.get('drawSize');
            drawsPerPeriod = game.get('hotColdTrendDrawsPerPeriod');
        
            hotColdTrend = new HotColdTrendAnalyser().getResult(numbers, draws.slice(), drawsPerPeriod, 12);
            elapseTimeTrend = new ElapseTimeTrendAnalyser().getResult(numbers, draws.slice());
            
            temp = hotColdTrend.getRisingNumbers();
            _.each(hotColdTrend.getHotNumbers(), function (number) {
                var alreadySuggested = temp.indexOf(number) != -1;

                if (!alreadySuggested) {
                    temp.push(number);
                }
            });

            view.renderHotColdTrend(temp.slice(0, drawSize));
            view.renderElapseTimeTrend(
                elapseTimeTrend.getElapseTimeNumbers().slice(0, drawSize),
                elapseTimeTrend.getElapseTimeGapNumbers().slice(0, drawSize)
            );
        });
    },
    
    tests: function (id) {
        var game = this.findGame(id), view;
        
        view = new TestsView({
            el: '#content-slot',
            drawSize: game.get('drawSize')
        });
        view.render();
        
        game.load(function () {
            var analyser = new HotColdTrendAnalyser(game);

            view.renderTests(analyser.test());
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
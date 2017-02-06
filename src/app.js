function App() {
    this.router = {};
    this.games = {};
    this.navigation = {};
    this.progress = {};
    this.lastGameStorage = new LastGameStorage();
}

App.prototype = _.extend({}, Backbone.Events, {
    constructor: App,

    init: function () {
        var app = this;

        this.games = new GameCollection();
        this.games.fetch({
            success: function () {
                app.initLastGame();
                app.renderNavigation();
                app.renderProgress();
                app.initRouting();
            }
        });
    },

    initLastGame: function () {
        if (!this.lastGameStorage.has()) {
            this.lastGameStorage.set(this.games.first());
        }
    },

    renderNavigation: function () {
        this.navigation.changeGame = new NavigationChangeGameView({
            el: '#navigation-change-game-slot',
            games: this.games,
            currentGame: this.lastGameStorage.get()
        });
        this.navigation.changeGame.render();
        
        this.navigation.gameMenu = new NavigationGameMenuView({
            el: '#navigation-game-menu-slot',
            game: this.lastGameStorage.get(),
            fragment: Backbone.history.fragment
        });
        this.navigation.gameMenu.render();
    },

    renderProgress: function () {
        var self = this, workers = {};

        this.progress = new ProgressPanelView({
            el: '#progress-panel-slot',
            icon: '#progress-icon .glyphicon'
        });
        this.progress.render();

        this.games.each(function (game) {
            var worker, barId = 'audit-' + game.get('id');

            worker = new Worker('audit-worker.js');

            worker.addEventListener('message', function(event) {
                if (event.data.hasOwnProperty('audits')) {
                    self.progress.addBar(barId, game.get('name'), event.data.audits);
                }

                if (event.data.hasOwnProperty('processed')) {
                    self.progress.updateBarProgress(barId, event.data.processed);
                }
            });

            worker.postMessage({
                start: {
                    numbers: game.get('numbers'),
                    drawSize: game.get('drawSize'),
                    drawsPerWeek: game.get('drawsPerWeek'),
                    draws: game.getAllDraws()
                }
            });

            // store the worker for later reference
            workers[game.get('id')] = worker;
        });
    },

    initRouting: function () {
        this.router = new Router({
            games: this.games,
            lastGame: this.lastGameStorage.get()
        });
        this.listenTo(this.router, 'game:changed', this.changeGame);
        Backbone.history.start();
    },

    changeGame: function (game) {
        this.lastGameStorage.set(game);
        this.navigation.gameMenu.setGame(game);
        this.navigation.gameMenu.setFragment(Backbone.history.fragment);
        this.navigation.gameMenu.render();
    }
});

var app = new App();
app.init();
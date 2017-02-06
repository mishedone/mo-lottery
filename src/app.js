function App() {
    this.router = {};
    this.games = {};
    this.navigation = {};
    this.progress = {};
    this.auditWinnersStorage = new AuditWinnersStorage();
    this.lastAuditStorage = new LastAuditStorage();
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
                app.initLastAudit();
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
        this.progress = new ProgressPanelView({
            el: '#progress-panel-slot',
            icon: '#progress-icon .glyphicon'
        });
        this.progress.render();
    },

    initRouting: function () {
        this.router = new Router({
            games: this.games,
            lastGame: this.lastGameStorage.get()
        });
        this.listenTo(this.router, 'game:changed', this.changeGame);
        Backbone.history.start();
    },

    initLastAudit: function () {
        var self = this, gamesToAudit = [], delay = 10000;

        // collect games that need auditing
        this.games.each(function (game) {
            if (!self.lastAuditStorage.has(game)) {
                gamesToAudit.push(game);
            }
        });

        // run the audit
        _.each(gamesToAudit, function (game, index) {
            var worker = new Worker('audit-worker.js');

            // handle audit data building events
            worker.addEventListener('message', function(event) {
                var bar = 'audit-' + game.get('id'), table;

                if (event.data.hasOwnProperty('audits')) {
                    self.progress.addBar(bar, game.get('name'), event.data.audits);
                }

                if (event.data.hasOwnProperty('processed')) {
                    self.progress.updateBarProgress(bar, event.data.processed);
                }

                if (event.data.hasOwnProperty('done')) {
                    self.lastAuditStorage.set(game, event.data.done);

                    // build audit table
                    table = new AuditTable('', game.get('drawSize'));
                    table.addRows(self.lastAuditStorage.get(game));

                    // save the winner
                    self.auditWinnersStorage.add(game, table.getWinner());

                    // kill the worker
                    worker.terminate();
                }
            });

            // start the worker with some delay to save some resources
            setTimeout(function () {
                worker.postMessage({
                    start: {
                        numbers: game.get('numbers'),
                        drawSize: game.get('drawSize'),
                        drawsPerWeek: game.get('drawsPerWeek'),
                        draws: game.getAllDraws()
                    }
                });
            }, index * delay);
        });
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
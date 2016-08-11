function App() {
    this.router = {};
    this.games = {};
    this.navs = {};
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
                app.renderNavs();
                app.initRouting();
            }
        });
    },

    initLastGame: function () {
        if (!this.lastGameStorage.has()) {
            this.lastGameStorage.set(this.games.first());
        }
    },

    renderNavs: function () {
        this.navs.changeGame = new ChangeGameView({
            el: '#change-game-slot',
            games: this.games,
            currentGame: this.lastGameStorage.get()
        });
        this.navs.changeGame.render();
        
        this.navs.gameMenu = new GameMenuView({
            el: '#game-menu-slot',
            game: this.lastGameStorage.get(),
            fragment: Backbone.history.fragment
        });
        this.navs.gameMenu.render();
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
        this.navs.gameMenu.setGame(game);
        this.navs.gameMenu.setFragment(Backbone.history.fragment);
        this.navs.gameMenu.render();
    }
});

var app = new App();
app.init();
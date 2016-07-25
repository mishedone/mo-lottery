function App() {
    this.games = {};
    this.currentGame = {};
    this.currentGameStorage = new CurrentGameStorage();
    this.router = new Router();
}

App.prototype = _.extend({}, Backbone.Events, {
    constructor: App,

    start: function () {
        var app = this;

        this.games = new GameCollection();
        this.games.fetch({
            success: function () {
                app.loadCurrentGame();
                app.render();
            }
        });
    },

    loadCurrentGame: function () {
        if (!this.currentGameStorage.has()) {
            this.currentGameStorage.set(this.games.first());
        }

        this.currentGame = this.currentGameStorage.get();
    },

    render: function () {
        this.renderNavigation();

        // start router
        Backbone.history.start();
    },

    renderNavigation: function () {
        var navigation = new NavigationView({
            el: '#navigation-slot',
            games: this.games,
            currentGame: this.currentGame
        });
        this.listenTo(navigation, 'game:change', this.changeGame);
        navigation.render();
    },

    changeGame: function (game) {
        this.currentGameStorage.set(game);

        // refresh current page
        Backbone.history.loadUrl(Backbone.history.fragment);
    }
});

var app = new App();
app.start();
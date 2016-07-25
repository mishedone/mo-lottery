function App() {
    this.games = {};
    this.lastGame = {};
    this.lastGameStorage = new LastGameStorage();
    this.router = new Router();
}

App.prototype = _.extend({}, Backbone.Events, {
    constructor: App,

    start: function () {
        var app = this;

        this.games = new GameCollection();
        this.games.fetch({
            success: function () {
                app.loadLastGame();
                app.render();
            }
        });
    },

    loadLastGame: function () {
        if (!this.lastGameStorage.has()) {
            this.lastGameStorage.set(this.games.first());
        }

        this.lastGame = this.lastGameStorage.get();
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
            currentGame: this.lastGame
        });
        this.listenTo(navigation, 'game:change', this.changeGame);
        navigation.render();
    },

    changeGame: function (game) {
        this.lastGameStorage.set(game);

        // refresh current page
        Backbone.history.loadUrl(Backbone.history.fragment);
    }
});

var app = new App();
app.start();
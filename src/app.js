function App() {
    this.router = {};
    this.games = {};
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
        var navigation = new NavigationView({
            el: '#navigation-slot',
            games: this.games,
            initGame: this.lastGameStorage.get()
        });
        navigation.render();
    },

    initRouting: function () {
        this.router = new Router({
            games: this.games,
            initGame: this.lastGameStorage.get()
        });
        this.listenTo(Backbone.history, 'route', this.changeGame);
        Backbone.history.start();
    },

    changeGame: function (router, route, params) {
        console.log(route);
        console.log(params);
        /*this.lastGameStorage.set(this.games.findWhere({
            id: params[0]
        }));*/
    }
});

var app = new App();
app.init();
function App() {
    this.games = {};
    this.currentGame = {};
    this.currentGameStorage = new CurrentGameStorage();
    this.router = new Router();

    this.start = function () {
        var app = this;

        this.games = new GameCollection();
        this.games.fetch({
            success: function () {
                app.loadCurrentGame();
                app.render();
            }
        });
    };

    this.loadCurrentGame = function () {
        if (!this.currentGameStorage.has()) {
            this.currentGameStorage.set(this.games.first());
        }

        this.currentGame = this.currentGameStorage.get();
    };
    
    this.render = function () {
        this.renderNavigation();
        
        // start router
        Backbone.history.start();
    };

    this.renderNavigation = function () {
        var navigation = new NavigationView({
            el: '#navigation-slot',
            games: this.games,
            currentGame: this.currentGame
        });
        navigation.render();
    };
}

var app = new App();
app.start();
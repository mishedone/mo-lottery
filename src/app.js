function App() {
    this.games = {};
    this.currentGame = {};
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
        this.currentGame = this.games.first();
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

/**
 * TODOS:
 * [x] 1. create provider-game model that has provider and game properties
 * [x] 2. choose provider-game for initial load
 * [ ] 3. create provider-game storage and save current state in there
 * [ ] 4. show last saved current provider-game when loading the application
 * [ ] 5. trigger on game changed event and save new state
 */
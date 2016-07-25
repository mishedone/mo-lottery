function App() {
    this.api = new Api();
    this.router = new Router();
    
    this.renderNavigation = function (providers) {
        var providerGame, navigation;

        providerGame = new ProviderGameModel({
            provider: providers[0],
            game: providers[0].games[0]
        });

        navigation = new NavigationView({
            el: '#navigation-slot',
            providers: providers,
            providerGame: providerGame
        });
        navigation.render();
    };
    
    this.render = function () {
        this.api.getProviders(this.renderNavigation);
        
        // start router
        Backbone.history.start();
    };
}

var app = new App();
app.render();

/**
 * TODOS:
 * [x] 1. create provider-game model that has provider and game properties
 * [x] 2. choose provider-game for initial load
 * [ ] 3. create provider-game storage and save current state in there
 * [ ] 4. show last saved current provider-game when loading the application
 * [ ] 5. trigger on game changed event and save new state
 */
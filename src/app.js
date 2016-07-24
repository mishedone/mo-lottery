function App() {
    this.api = new Api();
    this.router = new Router();
    
    this.renderNavigation = function (providers) {
        var navigation = new NavigationView({
            el: '#navigation-slot',
            providers: providers
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
 * 1. create provider-game model that has providerId, providerName, gameId, gameName properties
 * 2. choose provider-game for initial load
 * 3. create provider-game storage and save current state in there
 * 4. show last saved current provider-game when loading the application
 * 5. trigger on game changed event and save new state
 */
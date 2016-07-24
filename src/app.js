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
function App() {
    this.api = new Api();
    this.router = new Router();
    
    this.render = function () {
        var navigation = new NavigationView({
            el: '#navigation-slot',
            providers: [
                {
                    games: [
                        {
                            id: 'rocket',
                            name: 'Rocket'
                        }
                    ],
                    id: 'acme',
                    name: 'ACME'
                },
                {
                    games: [
                        {
                            id: '642',
                            name: '6/42'
                        },
                        {
                            id: '649',
                            name: '6/49'
                        }
                    ],
                    id: 'bst',
                    name: 'Bulgarian TOTO'
                }
            ]
        });
        navigation.render();
        
        // start router
        Backbone.history.start();
    };
}

var app = new App();
app.render();
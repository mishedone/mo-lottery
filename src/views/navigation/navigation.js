var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),
    games: [],
    currentGame: {},

    events: {
        'click .game': 'changeGame'
    },

    initialize: function (options) {
        this.games = options.games;
        this.currentGame = options.currentGame;
    },
    
    render: function () {
        this.$el.html(this.template({
            games: this.games,
            currentGame: this.currentGame
        }));

        return this;
    },

    changeGame: function (event) {
        var game, gameId;
        event.preventDefault();

        // identify selected game
        gameId = this.$(event.target).data('game-id');
        game = this.games.findWhere({
            id: gameId
        });

        // update view
        this.$('.current-game').html(game.get('name'));

        // trigger change event
        this.trigger('game:change', game);
    }
});
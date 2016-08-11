var ChangeGameView = Backbone.View.extend({
    template: _.template($('#change-game').html()),
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
        this.$('.current-game').html(this.$(event.target).html());
    }
});
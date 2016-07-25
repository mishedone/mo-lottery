var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),
    games: [],
    initGame: {},

    events: {
        'click .game': 'changeGame'
    },

    initialize: function (options) {
        this.games = options.games;
        this.initGame = options.initGame;
    },
    
    render: function () {
        this.$el.html(this.template({
            games: this.games,
            initGame: this.initGame
        }));

        return this;
    },

    changeGame: function (event) {
        this.$('.current-game').html(this.$(event.target).html());
    }
});
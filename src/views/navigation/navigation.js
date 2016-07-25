var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),
    games: [],
    currentGame: {},

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
    }
});
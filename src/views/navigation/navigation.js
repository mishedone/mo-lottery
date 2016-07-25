var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),
    providers: [],
    providerGame: {},

    initialize: function (options) {
        this.providers = options.providers;
        this.providerGame = options.providerGame;
    },
    
    render: function () {
        this.$el.html(this.template({
            providers: this.providers,
            providerGame: this.providerGame
        }));

        return this;
    }
});
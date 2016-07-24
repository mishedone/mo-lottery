var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),
    providers: [],

    initialize: function (options) {
        this.providers = options.providers;
    },
    
    render: function () {
        this.$el.html(this.template({
            providers: this.providers
        }));

        return this;
    }
});
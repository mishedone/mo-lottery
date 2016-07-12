var NavigationView = Backbone.View.extend({
    template: _.template($('#navigation').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    }
});
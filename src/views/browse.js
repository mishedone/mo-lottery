var BrowseView = Backbone.View.extend({
    template: _.template($('#browse').html()),
    years: {},

    initialize: function (options) {
        this.years = options.years;
    },

    render: function () {
        this.$el.html(this.template({
            years: this.years
        }));

        return this;
    }
});
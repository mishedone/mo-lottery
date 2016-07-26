var BrowseDrawsView = Backbone.View.extend({
    template: _.template($('#browse-draws').html()),
    draws: {},

    initialize: function (options) {
        this.draws = options.draws;
    },

    render: function () {
        this.$el.html(this.template({
            draws: this.draws
        }));

        return this;
    }
});
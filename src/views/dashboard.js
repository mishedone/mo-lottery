var DashboardView = Backbone.View.extend({
    drawCounts: {},
    template: _.template($('#dashboard').html()),
    
    initialize: function (options) {
        if (!options.hasOwnProperty('drawCounts')) {
            options.drawCounts = {};
        }
        this.drawCounts = options.drawCounts;
    },

    render: function () {
        this.$el.html(this.template({drawCounts: this.drawCounts}));

        return this;
    }
});
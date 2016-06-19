var DashboardView = Backbone.View.extend({
    drawCountsStorage: {},
    template: _.template($('#dashboard').html()),
    
    initialize: function (options) {
        if (!options.hasOwnProperty('drawCountsStorage')) {
            options.drawCountsStorage = new DrawCountsStorage();
        }
        this.drawCountsStorage = options.drawCountsStorage;
    },

    render: function () {
        this.$el.html(this.template({
            suggestions: this.drawCountsStorage.getSuggestions(),
            drawCounts: this.drawCountsStorage.getCounts()
        }));

        return this;
    }
});
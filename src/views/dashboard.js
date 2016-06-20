var DashboardView = Backbone.View.extend({
    numberCountsStorage: {},
    template: _.template($('#dashboard').html()),
    
    initialize: function (options) {
        if (!options.hasOwnProperty('numberCountsStorage')) {
            options.numberCountsStorage = new NumberCountsStorage();
        }
        this.numberCountsStorage = options.numberCountsStorage;
    },

    render: function () {
        this.$el.html(this.template({
            suggestions: this.numberCountsStorage.getSuggestions(),
            numberCounts: this.numberCountsStorage.getCounts()
        }));

        return this;
    }
});
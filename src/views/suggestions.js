var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    renderSuggestions: function (numbers) {
        this.$el.find('.hot-cold-trend').html(numbers.join(' '));
        
        return this;
    }
});
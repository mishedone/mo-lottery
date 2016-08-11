var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    renderSuggestions: function (numbers) {
        this.$el.find('.suggestions').html(numbers.join(' '));
        
        return this;
    }
});
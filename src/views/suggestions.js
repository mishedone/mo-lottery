var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),
    numbersTemplate: _.template($('#numbers').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    renderSuggestions: function (numbers) {
        this.$el.find('.hot-cold-trend').html(this.numbersTemplate({
            numbers: numbers
        }));
        
        return this;
    }
});
var BrowseYearsView = Backbone.View.extend({
    template: _.template($('#browse-years').html()),
    game: {},
    suggestions: {},

    initialize: function (options) {
        this.game = options.game;
        this.suggestions = options.suggestions;
    },

    render: function () {
        var view= this;

        this.$el.html(this.template({
            game: this.game
        }));

        this.suggestions.get(this.game, function (numbers) {
            view.$el.find('.suggestions').html(numbers.join(' '));
        });

        return this;
    }
});
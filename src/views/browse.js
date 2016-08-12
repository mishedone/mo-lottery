var BrowseView = Backbone.View.extend({
    template: _.template($('#browse').html()),
    numbersTemplate: _.template($('#numbers').html()),
    game: {},
    year: null,

    initialize: function (options) {
        this.game = options.game;
        this.year = options.year;
    },

    render: function () {
        this.$el.html(this.template({
            game: this.game,
            currentYear: this.year,
            numbersTemplate: this.numbersTemplate
        }));

        return this;
    }
});
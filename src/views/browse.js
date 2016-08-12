var BrowseView = Backbone.View.extend({
    template: _.template($('#browse').html()),
    drawsTemplate: _.template($('#browse-draws').html()),
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
            currentYear: this.year
        }));

        return this;
    },

    renderDraws: function () {
        this.$el.find('#browse-draws-slot').html(this.drawsTemplate({
            game: this.game,
            year: this.year,
            numbersTemplate: this.numbersTemplate
        }));

        return this;
    }
});
var BrowseYearsView = Backbone.View.extend({
    template: _.template($('#browse-years').html()),
    game: {},

    initialize: function (options) {
        this.game = options.game;
    },

    render: function () {
        this.$el.html(this.template({
            game: this.game
        }));

        return this;
    }
});
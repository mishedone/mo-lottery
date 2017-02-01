var ProgressBarView = Backbone.View.extend({
    template: _.template($('#progress-bar').html()),
    name: '',

    initialize: function (options) {
        this.name = options.name;
    },

    render: function () {
        this.$el.html(this.template({
            name: this.name
        }));

        return this;
    }
});
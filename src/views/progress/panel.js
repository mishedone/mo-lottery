var ProgressPanelView = Backbone.View.extend({
    template: _.template($('#progress-panel').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    }
});
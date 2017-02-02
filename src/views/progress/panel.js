var ProgressPanelView = Backbone.View.extend({
    template: _.template($('#progress-panel').html()),
    bars: {},

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    addBar: function (id, name, steps) {
        this.$el.find('#bars-slot').append('<div id="' + id + '"></div>');
        this.bars[id] = new ProgressBarView({
            el: this.$el.find('#' + id),
            name: name,
            steps: steps
        });
        this.bars[id].render();
    },

    updateBarProgress: function (id, add) {
        this.bars[id].addProgress(add);
    }
});
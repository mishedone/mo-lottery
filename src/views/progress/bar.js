var ProgressBarView = Backbone.View.extend({
    template: _.template($('#progress-bar').html()),
    bar: {},
    name: '',
    steps: 0,
    progress: 0,

    initialize: function (options) {
        this.name = options.name;
        this.steps = options.steps;
    },

    render: function () {
        this.$el.html(this.template({
            name: this.name
        }));
        this.bar = this.$el.find('.progress-bar');

        return this;
    },

    addProgress: function (add) {
        var progressPercent;

        // update progress
        this.progress += add;
        progressPercent = Math.round((100 * this.progress) / this.steps);
        this.bar.css('width', progressPercent + '%');

        // check if the process has finished
        if (progressPercent >= 100) {
            this.trigger('done');
        }
    }
});
var ProgressPanelView = Backbone.View.extend({
    template: _.template($('#progress-panel').html()),
    icon: {},
    bars: {},

    initialize: function (options) {
        this.icon = $(options.icon);
    },

    getBarCount: function () {
        return Object.keys(this.bars).length;
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    show: function () {
        this.$el.css('visibility', 'visible');
        this.icon.removeClass('glyphicon-ok');
        this.icon.addClass('glyphicon-refresh spin');
    },

    hide: function () {
        this.$el.css('visibility', 'hidden');
        this.icon.removeClass('glyphicon-refresh spin');
        this.icon.addClass('glyphicon-ok');
    },

    addBar: function (id, name, steps) {
        var self = this;

        // create and render the bar
        this.$el.find('#bars-slot').append('<div id="' + id + '"></div>');
        this.bars[id] = new ProgressBarView({
            el: this.$el.find('#' + id),
            name: name,
            steps: steps
        });
        this.bars[id].render();

        // show the panel if this is the first bar added
        if (this.getBarCount() == 1) {
            this.show();
        }

        // bind done event handling
        this.bars[id].on('done', function () {
            self.bars[id].remove();
            delete self.bars[id];

            // hide the panel if there are no bars left
            if (self.getBarCount() <= 0) {
                self.hide();
            }
        });
    },

    updateBarProgress: function (id, add) {
        if (this.bars.hasOwnProperty(id)) {
            this.bars[id].addProgress(add);
        }
    }
});
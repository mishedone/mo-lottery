var TestsView = Backbone.View.extend({
    template: _.template($('#tests').html()),
    testsRowTemplate: _.template($('#tests-row').html()),
    drawSize: null,

    initialize: function (options) {
        this.drawSize = options.drawSize;
    },

    render: function () {
        this.$el.html(this.template({
            drawSize: this.drawSize
        }));

        return this;
    },

    renderTests: function (tests) {
        var self = this, rowSlot = this.$el.find('#tests-row-slot');

        rowSlot.html('');
        _.each(tests, function (test) {
            rowSlot.append(self.testsRowTemplate({
                test: test
            }));
        });

        return this;
    }
});
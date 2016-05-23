/*global $, _, Backbone*/

var DashboardView = Backbone.View.extend({
    template: _.template($('#dashboard').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    }
});
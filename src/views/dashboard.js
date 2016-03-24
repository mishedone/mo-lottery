/*global $, _, Backbone*/

var DashboardView = (function () {
    "use strict";

    return Backbone.View.extend({
        template: _.template($('#dashboard').html()),

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });
}());
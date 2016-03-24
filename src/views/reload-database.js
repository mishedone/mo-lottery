/*global $, _, Backbone*/

var ReloadDatabaseView = (function () {
    "use strict";

    return Backbone.View.extend({
        template: _.template($('#reload-database').html()),

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });
}());
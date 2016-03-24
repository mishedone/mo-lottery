/*global Backbone*/

var Router = (function () {
    "use strict";

    return Backbone.Router.extend({
        routes: {
            'dashboard': 'dashboard',
            'reload-database': 'reloadDatabase',
            '': 'dashboard'
        },

        dashboard: function () {
            var view;
            view = new DashboardView({
                el: '#content'
            });
            view.render();
        },

        reloadDatabase: function () {
            var view;
            view = new ReloadDatabaseView({
                el: '#content'
            });
            view.render();
        }
    });
}());

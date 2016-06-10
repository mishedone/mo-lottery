/*global Backbone*/

var Router = Backbone.Router.extend({
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
        var view, loader;
        view = new ReloadDatabaseView({
            el: '#content'
        });
        view.render();
        loader = new YearLoader();
        loader.load();
    }
});
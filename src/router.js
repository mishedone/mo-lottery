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
        var view, storage;
        view = new ReloadDatabaseView({
            el: '#content'
        });
        view.render();
        storage = new EditionsStorage();
        storage.load();
    }
});
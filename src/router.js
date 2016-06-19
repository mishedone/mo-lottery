var Router = Backbone.Router.extend({
    routes: {
        'dashboard': 'dashboard',
        'reload-database': 'reloadDatabase',
        '': 'dashboard'
    },

    dashboard: function () {
        var view, drawCountsStorage;

        // load storage
        drawCountsStorage = new DrawCountsStorage();
        
        // render view
        view = new DashboardView({
            el: '#content',
            drawCountsStorage: drawCountsStorage
        });
        view.render();
    },

    reloadDatabase: function () {
        var view, editionsStorage, drawCountsStorage;
        
        // render view
        view = new ReloadDatabaseView({
            el: '#content'
        });
        view.render();
        
        // load storages
        editionsStorage = new EditionsStorage();
        drawCountsStorage = new DrawCountsStorage(editionsStorage);
        editionsStorage.on({
            'loaded': function () {
                drawCountsStorage.load();
                view.done();
            }
        });
        editionsStorage.load();
    }
});
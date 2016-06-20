var Router = Backbone.Router.extend({
    routes: {
        'dashboard': 'dashboard',
        'reload-database': 'reloadDatabase',
        '': 'dashboard'
    },

    dashboard: function () {
        var view, numberCountsStorage;

        // load storage
        numberCountsStorage = new NumberCountsStorage();
        
        // render view
        view = new DashboardView({
            el: '#content',
            numberCountsStorage: numberCountsStorage
        });
        view.render();
    },

    reloadDatabase: function () {
        var view, drawsStorage, numberCountsStorage;
        
        // render view
        view = new ReloadDatabaseView({
            el: '#content'
        });
        view.render();
        
        // load storage data
        drawsStorage = new DrawsStorage();
        numberCountsStorage = new NumberCountsStorage(drawsStorage);
        drawsStorage.on({
            'loaded': function () {
                numberCountsStorage.load();
                view.done();
            }
        });
        drawsStorage.load();
    }
});
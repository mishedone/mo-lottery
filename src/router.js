var Router = Backbone.Router.extend({
    routes: {
        '': 'dashboard'
    },

    dashboard: function () {
        var view;

        // render view
        view = new DashboardView({
            el: '#content'
        });
        view.render();
    }
});
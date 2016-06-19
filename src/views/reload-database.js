var ReloadDatabaseView = Backbone.View.extend({
    template: _.template($('#reload-database').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    done: function () {
        this.$('#done').html('Done.');
    }
});
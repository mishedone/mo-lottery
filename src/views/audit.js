var AuditView = Backbone.View.extend({
    template: _.template($('#audit').html()),

    render: function () {
        this.$el.html(this.template({
            tables: []
        }));

        return this;
    },

    renderTables: function (tables) {
        this.$el.html(this.template({
            tables: tables
        }));

        return this;
    }
});
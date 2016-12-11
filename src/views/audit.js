var AuditView = Backbone.View.extend({
    template: _.template($('#audit-table').html()),

    render: function (table) {
        this.$el.html(this.template({
            table: table
        }));

        return this;
    }
});
var AuditView = Backbone.View.extend({
    template: _.template($('#audit-table').html()),

    render: function () {
        this.$el.html('<h3>Auditing...</h3><hr/>');

        return this;
    },

    renderTable: function (table) {
        this.$el.html(this.template({
            table: table
        }));

        return this;
    }
});
var AuditView = Backbone.View.extend({
    template: _.template($('#audit-table').html()),

    renderEmpty: function () {
        this.$el.html('<h3>No audit data available yet...</h3><hr/>');

        return this;
    },

    renderTable: function (table) {
        this.$el.html(this.template({
            table: table
        }));

        return this;
    }
});
var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),
    auditTableTemplate: _.template($('#audit-table').html()),
    numbersTemplate: _.template($('#numbers').html()),
    algorithm: '?',
    auditTable: null,

    initialize: function (options) {
        this.algorithm = options.algorithm;
        this.auditTable = options.auditTable;
    },
    
    render: function () {
        this.$el.html(this.template({
            algorithm: this.algorithm,
            auditTable: this.auditTable,
            auditTableTemplate: this.auditTableTemplate
        }));

        return this;
    },
    
    renderSuggestions: function (suggestions) {
        this.$el.find('.suggestions').html(this.numbersTemplate({
            numbers: suggestions
        }));
        
        return this;
    }
});
var YearModel = Backbone.Model.extend({
    defaults: {
        'year': null,
        'editions': []
    },
    
    idAttribute: 'year',
    urlRoot: '/api/editions/year'
});
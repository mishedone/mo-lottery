var DrawsModel = Backbone.Model.extend({
    defaults: {
        'year': null,
        'draws': []
    },
    
    idAttribute: 'year',
    urlRoot: '/api/draws'
});
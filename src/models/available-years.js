/*global Backbone*/

var AvailableYearsModel = Backbone.Model.extend({
    defaults: {
        'years': []
    },
    
    url: '/api/editions/available-years'
});
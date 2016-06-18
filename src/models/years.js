var YearsModel = Backbone.Model.extend({
    defaults: {
        'years': []
    },
    
    url: '/api/years',
    
    getYears: function () {
        return this.get('years');
    }
});
var YearCollection = new Backbone.Collection.extend({
    model: YearModel,
    localStorage: new Backbone.LocalStorage('years')
});
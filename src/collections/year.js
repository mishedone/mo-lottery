/*global Backbone, YearModel*/

var YearCollection = new Backbone.Collection.extend({
    model: YearModel,
    localStorage: new Backbone.localStorage('years')
});
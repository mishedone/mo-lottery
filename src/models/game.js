var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        years: {}
    },

    loadYears: function (success) {
        this.set('years', new YearCollection(null, {gameId: this.get('id')}));
        this.get('years').fetch({success: success});
    }
});
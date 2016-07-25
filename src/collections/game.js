var GameCollection = Backbone.Collection.extend({
    model: GameModel,
    url: '/api/games'
});
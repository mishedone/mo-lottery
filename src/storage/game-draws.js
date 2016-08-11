function GameDrawsStorage(game) {
    this.game = game;
}

GameDrawsStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: GameDrawsStorage,

    has: function (year) {
        return null != this.loadData(this.key(year));
    },

    get: function (year) {
        return this.loadData(this.key(year));
    },

    set: function (year, draws) {
        this.saveData(this.key(year), draws);
    },

    key: function (year) {
        return this.game.get('id') + ':' + year;
    }
});
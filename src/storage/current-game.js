function CurrentGameStorage() {
    var currentGame = this.loadData(this.key);

    this.currentGame = null;
    if (null != currentGame) {
        this.currentGame = new GameModel(currentGame);
    }
}

CurrentGameStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: CurrentGameStorage,
    key: 'current-game',

    has: function () {
        return null != this.currentGame;
    },

    get: function () {
        return this.currentGame;
    },

    set: function (game) {
        this.currentGame = game;
        this.saveData(this.key, game);
    }
});
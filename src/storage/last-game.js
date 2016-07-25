function LastGameStorage() {
    var data = this.loadData(this.key);

    this.lastGame = null;
    if (null != data) {
        this.lastGame = new GameModel(data);
    }
}

LastGameStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: LastGameStorage,
    key: 'last-game',

    has: function () {
        return null != this.lastGame;
    },

    get: function () {
        return this.lastGame;
    },

    set: function (game) {
        this.lastGame = game;
        this.saveData(this.key, game);
    }
});
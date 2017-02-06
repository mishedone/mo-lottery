function LastAuditStorage() {
    this.date = new Date().toISOString().slice(0,10);
}

LastAuditStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: LastAuditStorage,

    get: function (game) {
        var data = this.loadData(this.key(game));

        // return audit data for today only
        // old data is not interesting
        if (data.date == this.date) {
            return data.audit;
        }

        return null;
    },

    has: function (game) {
        return this.get(game) != null;
    },

    set: function (game, audit) {
        this.saveData(this.key(game), {
            date: this.date,
            audit: audit
        });
    },

    key: function (game) {
        return game.get('id') + ':last-audit';
    }
});
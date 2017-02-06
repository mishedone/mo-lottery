function LastAuditStorage() {
    this.date = new Date().toISOString().slice(0,10);
}

LastAuditStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: LastAuditStorage,

    get: function (game) {
        var data = this.loadData(this.key(game)), audit = [];

        // no data yet
        if (data == null) {
            return null;
        }

        // there is audit data but it is old
        if (data.date != this.date) {
            return null;
        }

        // transform raw data into real objects
        _.each(data.audit, function (json) {
            audit.push(new AuditData().createFromJson(json));
        });

        return audit;
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
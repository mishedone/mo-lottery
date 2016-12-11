function AuditWinnersStorage() {}

AuditWinnersStorage.prototype = _.extend({}, BaseStorage.prototype, {
    constructor: AuditWinnersStorage,

    get: function (game) {
        var rawData = this.loadData(this.key(game)), data = [];
        
        // return empty array when we have no data yet
        if (null === rawData) {
            return data;
        }
        
        // transform raw data into real objects
        _.each(rawData, function (json) {
            data.push(new AuditData().createFromJson(json));
        });
        
        return data;
    },
    
    getLast: function (game) {
        return _.last(this.get(game));
    },

    set: function (game, auditData) {
        var data = this.get(game);
        
        // check if audit data is already stored
        if (data.length) {
            if (_.last(data).equals(auditData)) {
                return;
            }
        }
        
        // append data
        data.push(auditData);
        
        this.saveData(this.key(game), data);
    },

    key: function (game) {
        return game.get('id') + ':audit-winners';
    }
});
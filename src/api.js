function Api() {}

Api.prototype = {
    constructor: Api,

    getProviders: function () {
        return this.get('/api/providers').providers;
    },

    getYears: function (providerId, gameId) {
        return this.get('/api/years/' + providerId + '/' + gameId).years;
    },

    getDraws: function (providerId, gameId, year) {
        return this.get('/api/draws/' + providerId + '/' + gameId + '/' + year).draws;
    },

    get: function (url) {
        var data;

        jQuery.ajax({
            url: url,
            async: false,
            success: function (result) {
                data = result;
            }
        });

        return data;
    }
};
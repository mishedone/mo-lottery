function Api() {}

Api.prototype = {
    constructor: Api,

    getProviders: function (success) {
        var url = '/api/providers';
        this.get(url, success, 'providers');
    },

    getYears: function (success, params) {
        var url = '/api/years/' + params.providerId + '/' + params.gameId;
        this.get(url, success, 'years');
    },

    getDraws: function (success, params) {
        var url = '/api/draws/' + params.providerId + '/' + params.gameId + '/' + params.year;
        this.get(url, success, 'draws');
    },

    get: function (url, success, property) {
        jQuery.ajax({
            url: url,
            success: function (result) {
                success(result[property]);
            }
        });
    }
};
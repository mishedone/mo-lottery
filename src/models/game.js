var GameModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        drawSize: null,
        possibleDraws: 0,
        numbers: [],
        years: []
    },

    initialize: function () {
        this.drawsStorage = new GameDrawsStorage(this);
    },

    load: function (success) {
        var self = this, loadedDraws = 0;

        _.each(this.get('years'), function (year) {
            self.loadDraws(year, function () {
                loadedDraws++;
                if (loadedDraws == self.get('years').length) {
                    success();
                }
            });
        });
    },

    loadDraws: function (year, success) {
        var self = this, currentYear;

        currentYear = new Date().getFullYear();
        if (currentYear != year  && this.getDraws(year)) {
            return success();
        }

        // load draws for wanted year (current year is always reloaded)
        $.get(this.getDrawsUrl(year), function (draws) {
            self.drawsStorage.set(year, draws);
            success();
        });
    },

    getDraws: function (year) {
        return this.drawsStorage.get(year);
    },
    
    getAllDraws: function () {
        var self = this, draws = [];

        _.each(this.get('years'), function (year) {
            draws = draws.concat(self.getDraws(year));
        });
        
        return draws;
    },

    getDrawsUrl: function (year) {
        return '/api/draws/' + this.get('id') + '/' + year;
    }
});
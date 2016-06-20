function DrawsStorage() {
    this.draws = this.loadData(this.drawsKey);
    this.status = this.loadData(this.statusKey);

    // local storage is empty so we save some default values
    if (null == this.draws) {
        this.draws = {};
        this.saveDraws();
    }
    
    if (null == this.status) {
        this.status = {
            isLoaded: false
        };
        this.saveStatus();
    }
}

DrawsStorage.prototype = _.extend({}, BasicStorage.prototype, Backbone.Events, {
    constructor: DrawsStorage,
    drawsKey: 'draws',
    statusKey: 'draws-status',

    load: function () {
        if (this.status.isLoaded) {
            this.loadCurrentYearDraws();
        } else {
            this.loadAllDraws();
            this.status.isLoaded = true;
        }
        
        // save
        this.saveDraws();
        this.saveStatus();
        
        // trigger done event
        this.trigger('loaded');
    },
    
    loadCurrentYearDraws: function () {
        var currentYear = new Date().getFullYear();
        
        this.updateDraws(currentYear);
    },
    
    loadAllDraws: function () {
        var years = this.getYears();
        
        for (i = 0; i < years.length; i++) {
            this.updateDraws(years[i]);
        }
    },
    
    getYears: function () {
        var years = new YearsModel();
        years.fetch({async: false});
        
        return years.getYears();
    },
    
    getDraws: function () {
        return this.draws;
    },
    
    updateDraws: function (year) {
        var draws = new DrawsModel({year: year});
        draws.fetch({async: false});
            
        this.draws[year] = draws;
    },
    
    saveDraws: function () {
        this.saveData(this.drawsKey, this.draws);
    },
    
    saveStatus: function () {
        this.saveData(this.statusKey, this.status);
    }
});
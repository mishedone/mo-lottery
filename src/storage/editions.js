function EditionsStorage() {
    this.editions = this.loadData(this.editionsKey);
    this.status = this.loadData(this.statusKey);

    // local storage is empty so we save some default values
    if (null == this.editions) {
        this.editions = {};
        this.saveEditions();
    }
    
    if (null == this.status) {
        this.status = {
            isLoaded: false
        };
        this.saveStatus();
    }
}

EditionsStorage.prototype = _.extend({}, BasicStorage.prototype, Backbone.Events, {
    constructor: EditionsStorage,
    editionsKey: 'editions',
    statusKey: 'editions-status',

    load: function () {
        if (this.status.isLoaded) {
            this.loadCurrentYearEditions();
        } else {
            this.loadAllEditions();
            this.status.isLoaded = true;
        }
        
        // save
        this.saveEditions();
        this.saveStatus();
        
        // trigger done event
        this.trigger('loaded');
    },
    
    loadCurrentYearEditions: function () {
        var currentYear = new Date().getFullYear();
        
        this.updateEditions(currentYear);
    },
    
    loadAllEditions: function () {
        var years = this.getYears();
        
        for (i = 0; i < years.length; i++) {
            this.updateEditions(years[i]);
        }
    },
    
    getYears: function () {
        var years = new YearsModel();
        years.fetch({async: false});
        
        return years.getYears();
    },
    
    getEditions: function () {
        return this.editions;
    },
    
    updateEditions: function (year) {
        var editions = new EditionsModel({year: year});
        editions.fetch({async: false});
            
        this.editions[year] = editions;
    },
    
    saveEditions: function () {
        this.saveData(this.editionsKey, this.editions);
    },
    
    saveStatus: function () {
        this.saveData(this.statusKey, this.status);
    }
});
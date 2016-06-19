function DrawCountsStorage(editionsStorage) {
    this.counts = this.loadData(this.countsKey);
    this.editionsStorage = editionsStorage;

    // local storage is empty so we save some default values
    if (null == this.counts) {
        this.counts = {};
        this.saveCounts();
    }
}

DrawCountsStorage.prototype = _.extend({}, BasicStorage.prototype, {
    constructor: DrawCountsStorage,
    countsKey: 'draw-counts',
    
    load: function () {
        var self = this;
        
        this.counts = {};
        _.each(this.getEditionsStorage().getEditions(), function (editions, year) {
            _.each(editions.editions, function (draws) {
                _.each(draws, function (number) {
                    if (!self.counts.hasOwnProperty(number)) {
                        self.counts[number] = 0;
                    }
                    self.counts[number]++;
                });
            });
        });
        
        this.saveCounts();
    },
    
    getEditionsStorage: function () {
        if (null == this.editionsStorage) {
            this.editionsStorage = new EditionsStorage();
        }
        
        return this.editionsStorage;
    },
    
    getCounts: function () {
        return this.counts;
    },
    
    saveCounts: function () {
        this.saveData(this.countsKey, this.counts);
    }
});
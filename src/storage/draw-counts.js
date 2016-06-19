function DrawCountsStorage(editionsStorage) {
    this.counts = this.loadData(this.countsKey);
    this.editionsStorage = editionsStorage;

    // local storage is empty so we save some default values
    if (null == this.counts) {
        this.counts = [];
        this.saveCounts();
    }
}

DrawCountsStorage.prototype = _.extend({}, BasicStorage.prototype, {
    constructor: DrawCountsStorage,
    countsKey: 'draw-counts',
    
    load: function () {
        var self, counts;
        
        self = this;
        counts = {};
        
        // accumulate counts into a hash map
        _.each(this.getEditionsStorage().getEditions(), function (editions, year) {
            _.each(editions.editions, function (draws) {
                _.each(draws, function (number) {
                    if (!counts.hasOwnProperty(number)) {
                        counts[number] = 0;
                    }
                    counts[number]++;
                });
            });
        });
        
        // transform the hash map into a sortable array
        this.counts = [];
        _.each(counts, function (count, number) {
            self.counts.push({
                number: number,
                count: count
            });
        });
        
        this.saveCounts();
    },
    
    getSuggestions: function () {
        return this.getOrderedCounts().slice(0, 6);
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
    
    getOrderedCounts: function () {
        // slice(0) will copy the this.counts array and than do the sorting
        return this.getCounts().slice(0).sort(function (a, b) {
            return b.count - a.count;
        });
    },
    
    saveCounts: function () {
        this.saveData(this.countsKey, this.counts);
    }
});
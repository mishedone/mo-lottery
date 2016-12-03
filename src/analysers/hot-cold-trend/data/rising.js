function HotColdTrendRisingData(number, hits) {
    this.number = number;
    this.lastHits = hits;
    this.count = 1;
    this.dropped = false;
}

HotColdTrendRisingData.prototype = {
    constructor: HotColdTrendRisingData,
    
    getNumber: function () {
        return this.number;
    },

    getCount: function () {
        return this.count;
    },

    addHits: function (hits) {
        var hitsAreRising = (hits <= this.lastHits);

        if (!this.dropped && hitsAreRising) {
            this.count++;
        }

        this.lastHits = hits;
    },

    drop: function () {
        this.dropped = true;
    }
};
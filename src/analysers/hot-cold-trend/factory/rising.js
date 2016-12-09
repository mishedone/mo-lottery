function HotColdTrendRisingFactory() {}

HotColdTrendRisingFactory.prototype = {
    constructor: HotColdTrendRisingFactory,
    
    get: function (periods, hotHits) {
        var self = this;
        
        this.hotHits = hotHits;
        this.risingCollection = new NumberCollection();
        
        _.each(periods, function (period, index) {
            _.each(period.getHits(), function (hit) {
                if (index == 0) {
                    self.initializeRising(hit.getNumber(), hit.getCount());
                } else {
                    self.updateRising(hit.getNumber(), hit.getCount());
                }
            });
        });
        
        return this.risingCollection.extract();
    },
    
    initializeRising: function (number, hits) {
        if (this.isNumberHot(hits)) {
            this.risingCollection.add(
                number,
                new HotColdTrendRisingData(number, hits)
            );
        }
    },
    
    updateRising: function (number, hits) {
        if (!this.risingCollection.has(number)) {
            return;
        }

        // update rising
        if (this.isNumberHot(hits)) {
            this.risingCollection.get(number).addHits(hits);
        } else {
            this.risingCollection.get(number).drop();
        }
    },
    
    isNumberHot: function (hits) {
        return hits > this.hotHits;
    }
}
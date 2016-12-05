function HotColdTrendResultFactory() {}

HotColdTrendResultFactory.prototype = {
    constructor: HotColdTrendResultFactory,
    
    get: function (periods) {
        var lastPeriod = periods[0];

        this.hitThreshold = lastPeriod.getAverageHit();
        this.risings = new NumberCollection();
        this.buildRisings(periods);
        
        return new HotColdTrendResultData(
            periods,
            this.risings.extract(),
            this.getRisingNumbers(),
            this.getHotNumbers(lastPeriod)
        );
    },
    
    isNumberHot: function (hits) {
        return hits > this.hitThreshold;
    },
    
    buildRisings: function (periods) {
        var self = this;
        
        _.each(periods, function (period, index) {
            _.each(period.getHits(), function (hit) {
                if (index == 0) {
                    self.initializeRising(hit.getNumber(), hit.getCount());
                } else {
                    self.updateRising(hit.getNumber(), hit.getCount());
                }
            });
        });
    },
    
    initializeRising: function (number, hits) {
        if (this.isNumberHot(hits)) {
            this.risings.add(number, new HotColdTrendRisingData(number, hits));
        }
    },
    
    updateRising: function (number, hits) {
        if (!this.risings.has(number)) {
            return;
        }

        // update rising
        if (this.isNumberHot(hits)) {
            this.risings.get(number).addHits(hits);
        } else {
            this.risings.get(number).drop();
        }
    },
    
    getRisingNumbers: function () {
        risings = this.risings.extract();
        
        // remove not rising numbers from risings
        risings = _.filter(risings, function (rising) {
            return (rising.getCount() > 1);
        });        
        
        // sort risings by count
        risings.sort(function (a, b) {
            return a.getCount() - b.getCount();
        });
        risings.reverse();
        
        return extractNumbers(risings);
    },
    
    getHotNumbers: function (lastPeriod) {
        hits = lastPeriod.getHits();
        
        // sort hits by count
        hits.sort(function (a, b) {
            if (a.getCount() == b.getCount()) {
                return a.getNumber() - b.getNumber();
            }

            return a.getCount() - b.getCount();
        });
        hits.reverse();
        
        return extractNumbers(hits);
    }
};
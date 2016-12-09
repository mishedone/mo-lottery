function HotColdTrendResultFactory() {
    this.numberExtractor = new AnalyserNumberExtractor();
}

HotColdTrendResultFactory.prototype = {
    constructor: HotColdTrendResultFactory,
    
    get: function (periods, risings) {
        var lastPeriod = periods[0];
        
        return new HotColdTrendResultData(
            periods,
            risings,
            this.getRisingNumbers(risings),
            this.getHotNumbers(lastPeriod)
        );
    },
    
    getRisingNumbers: function (risings) {
        risings = risings.slice();
        
        // remove not rising numbers from risings
        risings = _.filter(risings, function (rising) {
            return (rising.getCount() > 1);
        });        
        
        // sort risings by count
        risings.sort(function (a, b) {
            return a.getCount() - b.getCount();
        });
        risings.reverse();
        
        return this.numberExtractor.extract(risings);
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
        
        return this.numberExtractor.extract(hits);
    }
};
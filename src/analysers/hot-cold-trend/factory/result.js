function HotColdTrendResultFactory() {
    this.numberExtractor = new AnalyserNumberExtractor();
}

HotColdTrendResultFactory.prototype = {
    constructor: HotColdTrendResultFactory,
    
    get: function (periods, risings, numberSorter) {
        var lastPeriod = periods[0];

        this.numberSorter = numberSorter;
        
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
        this.numberSorter.sort(risings, 'getCount', 'getNumber');
        risings.reverse();
        
        return this.numberExtractor.extract(risings);
    },
    
    getHotNumbers: function (lastPeriod) {
        hits = lastPeriod.getHits();
        
        // sort hits by count
        this.numberSorter.sort(hits, 'getCount', 'getNumber');
        hits.reverse();
        
        return this.numberExtractor.extract(hits);
    }
};
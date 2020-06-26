function HotColdTrendResultFactory() {
    this.numberExtractor = new AnalyserNumberExtractor();
}

HotColdTrendResultFactory.prototype = {
    constructor: HotColdTrendResultFactory,
    
    get: function (periods, risings, risingSorter, hotSorter) {
        var lastPeriod = periods[0];

        this.risingSorter = risingSorter;
        this.hotSorter = hotSorter;
        
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
        this.risingSorter.sort(risings, 'getCount', 'getNumber');
        risings.reverse();
        
        return this.numberExtractor.extract(risings);
    },
    
    getHotNumbers: function (lastPeriod) {
        var hits = lastPeriod.getHits();
        
        // sort hits by count
        this.hotSorter.sort(hits, 'getCount', 'getNumber');
        hits.reverse();
        
        return this.numberExtractor.extract(hits);
    }
};
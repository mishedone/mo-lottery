function ElapseTimeTrendAnalyser() {
    this.periodFactory = new ElapseTimeTrendPeriodFactory();
    this.resultFactory = new ElapseTimeTrendResultFactory();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    getResult: function (
        numbers,
        draws,
        drawsPerPeriod,
        hitAggregator,
        elapseTimeSorter,
        gapDistanceSorter
    ) {
        var period = this.periodFactory.get(
            numbers,
            draws.slice(drawsPerPeriod * -1),
            hitAggregator
        );
        
        return this.resultFactory.get(
            period,
            elapseTimeSorter,
            gapDistanceSorter
        );
    }
};
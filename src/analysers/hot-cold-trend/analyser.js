function HotColdTrendAnalyser() {
    this.periodFactory = new HotColdTrendPeriodFactory();
    this.risingFactory = new HotColdTrendRisingFactory();
    this.resultFactory = new HotColdTrendResultFactory();
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    getResult: function (numbers, draws, drawsPerPeriod, periodCount) {
        var periods, lastPeriod, risings, drawCount;

        draws.reverse();
        drawCount = drawsPerPeriod * periodCount;
        
        periods = this.periodFactory.get(
            numbers,
            draws.slice(0, drawCount),
            periodCount
        );
        lastPeriod = periods[0];
        
        risings = this.risingFactory.get(
            periods,
            lastPeriod.getAverageHit()
        );

        return this.resultFactory.get(periods, risings);
    }
};
function HotColdTrendAnalyser() {
    this.periodFactory = new HotColdTrendPeriodFactory();
    this.resultFactory = new HotColdTrendResultFactory();
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    getResult: function (numbers, draws, drawsPerPeriod, periodCount) {
        var periods, drawCount;

        draws.reverse();
        drawCount = drawsPerPeriod * periodCount;
        periods = this.periodFactory.get(
            numbers,
            draws.slice(0, drawCount),
            periodCount
        );

        return this.resultFactory.get(periods);
    }
};
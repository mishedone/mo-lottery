function ElapseTimeTrendAnalyser() {
    this.periodFactory = new ElapseTimeTrendPeriodFactory();
    this.resultFactory = new ElapseTimeTrendResultFactory();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    getResult: function (numbers, draws, drawsPerPeriod, numberSorter) {
        var period = this.periodFactory.get(
            numbers,
            draws.slice(drawsPerPeriod * -1)
        );
        
        return this.resultFactory.get(period, numberSorter);
    }
};
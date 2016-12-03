function ElapseTimeTrendAnalyser() {
    this.periodFactory = new ElapseTimeTrendPeriodFactory();
    this.resultFactory = new ElapseTimeTrendResultFactory();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    getResult: function (numbers, draws) {
        var period = this.periodFactory.get(
            numbers,
            draws.slice(-300)
        );
        
        return this.resultFactory.get(period);
    }
};
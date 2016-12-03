function ElapseTimeTrendResultData(period, elapseTimeNumbers, elapseTimeGapNumbers) {
    this.period = period;
    this.elapseTimeNumbers = elapseTimeNumbers;
    this.elapseTimeGapNumbers = elapseTimeGapNumbers;
}

ElapseTimeTrendResultData.prototype = {
    constructor: ElapseTimeTrendResultData,
    
    getPeriod: function () {
        return this.period;
    },

    getElapseTimeNumbers: function () {
        return this.elapseTimeNumbers;
    },

    getElapseTimeGapNumbers: function () {
        return this.elapseTimeGapNumbers;
    }
};
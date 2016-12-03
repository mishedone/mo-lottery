function ElapseTimeTrendResultData(
    period,
    numbersByElapseTime,
    numbersByElapseTimeGap
) {
    this.period = period;
    this.numbersByElapseTime = numbersByElapseTime;
    this.numbersByElapseTimeGap = numbersByElapseTimeGap;
}

ElapseTimeTrendResultData.prototype = {
    constructor: ElapseTimeTrendResultData,
    
    getPeriod: function () {
        return this.period;
    },

    getNumbersByElapseTime: function () {
        return this.numbersByElapseTime;
    },

    getNumbersByElapseTimeGap: function () {
        return this.numbersByElapseTimeGap;
    }
};
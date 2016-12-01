function ElapseTimeTrendResultData(
    numbersByElapseTime,
    numbersByElapseTimeGap
) {
    this.numbersByElapseTime = numbersByElapseTime;
    this.numbersByElapseTimeGap = numbersByElapseTimeGap;
}

ElapseTimeTrendResultData.prototype = {
    constructor: ElapseTimeTrendResultData,

    getNumbersByElapseTime: function () {
        return this.numbersByElapseTime;
    },

    getNumbersByElapseTimeGap: function () {
        return this.numbersByElapseTimeGap;
    }
};
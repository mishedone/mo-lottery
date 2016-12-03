function HotColdTrendResultData(periods, risings, risingNumbers, hotNumbers) {
    this.periods = periods;
    this.risings = risings;
    this.risingNumbers = risingNumbers;
    this.hotNumbers = hotNumbers;
}

HotColdTrendResultData.prototype = {
    constructor: HotColdTrendResultData,

    getPeriods: function () {
        return this.periods;
    },
    
    getRisings: function () {
        return this.risings;
    },
    
    getRisingNumbers: function () {
        return this.risingNumbers;
    },
    
    getHotNumbers: function () {
        return this.hotNumbers;
    }
};
function ElapseTimeTrendHitData(number, aggregator) {
    this.number = number;
    this.aggregator = aggregator;
    this.drawnIn = [];
    this.elapseTime = null;
    this.aggregateElapseTime = null;
    this.elapseTimeGap = null;
}

ElapseTimeTrendHitData.prototype = {
    constructor: ElapseTimeTrendHitData,

    getNumber: function () {
        return this.number;
    },

    getElapseTime: function () {
        return this.elapseTime;
    },

    getAggregateElapseTime: function () {
        return this.aggregateElapseTime;
    },

    getElapseTimeGap: function () {
        return this.elapseTimeGap;
    },

    getElapseTimeGapDistance: function () {
        return Math.abs(this.elapseTimeGap + 1);
    },

    hit: function (index) {
        this.drawnIn.push(index);
    },

    calculateElapseTimes: function (index) {
        var lastDrawnIndex;

        // if the number has not been drawn - assume elapse time equals current draw index
        if (!this.isDrawn()) {
            this.elapseTime = index;

            return;
        }

        lastDrawnIndex = this.drawnIn[this.drawnIn.length - 1];
        this.elapseTime = index - lastDrawnIndex;

        // we can have aggregate only if there is at least 1 gap
        if (this.getGapCount()) {
            this.aggregateElapseTime = Math.round(this.aggregator.aggregate(this.getGaps()));
            this.elapseTimeGap = this.elapseTime - this.aggregateElapseTime;
        }
    },

    isDrawn: function () {
        return (this.drawnIn.length != 0);
    },

    getGapCount: function () {
        return this.drawnIn.length - 1;
    },

    getGaps: function () {
        var gaps = [], iterator;

        // accumulate draw index gaps
        iterator = this.drawnIn.length - 1;
        for (iterator; iterator > 0; iterator--) {
            gaps.push(this.drawnIn[iterator] - this.drawnIn[iterator - 1]);
        }

        return gaps;
    }
};
function ElapseTimeTrendHitData(number) {
    this.number = number;
    this.drawnIn = [];
    this.elapseTime = null;
    this.averageElapseTime = null;
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

    getAverageElapseTime: function () {
        return this.averageElapseTime;
    },

    getElapseTimeGap: function () {
        return this.elapseTimeGap;
    },

    getElapseTimeGapDistance: function () {
        return Math.abs(this.getElapseTimeGap() + 1);
    },

    hit: function (index) {
        this.drawnIn.push(index);
    },

    calculateElapseTimes: function (index) {
        var elapseTimeSum = 0, lastDrawnIndex, iterator;

        // if the number has not been drawn - assume elapse time equals current draw index
        if (!this.isDrawn()) {
            this.elapseTime = index;

            return;
        }

        // sum all elapse times between each hit index (going from end to beginning)
        iterator = this.drawnIn.length - 1;
        for (iterator; iterator > 0; iterator--) {
            elapseTimeSum += this.drawnIn[iterator] - this.drawnIn[iterator - 1];
        }

        lastDrawnIndex = this.drawnIn[this.drawnIn.length - 1];
        this.elapseTime = index - lastDrawnIndex;

        // we can have average only if there is at least 1 gap
        if (this.getGapCount()) {
            this.averageElapseTime = Math.round(elapseTimeSum / this.getGapCount());
            this.elapseTimeGap = this.elapseTime - this.averageElapseTime;
        }
    },

    isDrawn: function () {
        return (this.drawnIn.length != 0);
    },

    getGapCount: function () {
        return this.drawnIn.length - 1;
    }
};
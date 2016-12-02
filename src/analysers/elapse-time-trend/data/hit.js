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

    hit: function (index) {
        this.drawnIn.push(index);
    },

    calculateElapseTimes: function (index) {
        var drawnIn = this.drawnIn.slice(), elapseTimeSum = 0, gaps = (drawnIn.length - 1), iterator;

        // if the number has not been drawn - assume elapse time equals current draw index
        if (drawnIn.length == 0) {
            this.elapseTime = index;

            return;
        }

        // sum all elapse times between each hit index (going from end to beginning)
        iterator = drawnIn.length - 1;
        for (iterator; iterator > 0; iterator--) {
            elapseTimeSum += drawnIn[iterator] - drawnIn[iterator - 1];
        }

        this.elapseTime = index - drawnIn[drawnIn.length - 1];

        // we can have average only if there is at least 1 gap
        if (drawnIn.length > 1) {
            this.averageElapseTime = Math.round(elapseTimeSum / gaps);
            this.elapseTimeGap = this.elapseTime - this.averageElapseTime;
        }
    }
};
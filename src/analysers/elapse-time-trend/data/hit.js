function ElapseTimeTrendHitData(number) {
    this.number = number;
    this.drawnIn = [];
    this.elapseTime = null;
    this.averageElapseTime = null;
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

    hit: function (index) {
        this.drawnIn.push(index);
    },

    calculateElapseTimes: function (index) {
        var drawnIn = this.drawnIn.slice(), elapseTimeSum = 0, gaps = (drawnIn.length - 1), iterator;

        // skip if the number has not been drawn
        if (drawnIn.length == 0) {
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
        }
    }
};
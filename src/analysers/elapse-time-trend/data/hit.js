function ElapseTimeTrendHitData(number) {
    this.number = number;
    this.drawnIn = [];
    this.rank = 0;
    this.elapseTime = 0;
    this.averageElapseTime = 0;
}

ElapseTimeTrendHitData.prototype = {
    constructor: ElapseTimeTrendHitData,

    getNumber: function () {
        return this.number;
    },

    hit: function (index) {
        this.drawnIn.push(index);
    },

    getRank: function () {
        return this.rank;
    },

    setRank: function (rank) {
        this.rank = rank;
    },

    calculateElapseTimes: function (index) {
        var drawnIn = this.drawnIn.slice(), elapseTimeSum = 0, iterator;

        // sum all elapse times between each hit index (going from end to beginning)
        iterator = drawnIn.length - 1;
        for (iterator; iterator > 0; iterator--) {
            elapseTimeSum += drawnIn[iterator] - drawnIn[iterator - 1];
        }

        this.elapseTime = index - drawnIn[drawnIn.length - 1];
        this.averageElapseTime = Math.round(elapseTimeSum / drawnIn.length);
    }
};
function HotColdTrendTestData(drawSize, drawCount, periodCount) {
    var numberCount;

    // initialize hit numbers
    this.numbersHit = {};
    for (numberCount = 0; numberCount <= drawSize; numberCount++) {
        this.numbersHit[numberCount] = 0;
    }

    this.drawCount = drawCount;
    this.periodCount = periodCount;
    this.score = 0;
}

HotColdTrendTestData.prototype = {
    constructor: HotColdTrendTestData,

    check: function (suggestion, draw) {
        var numberCount = 0;

        _.each(suggestion, function (number) {
            if (draw.indexOf(number) >= 0) {
                numberCount++;
            }
        });

        this.numbersHit[numberCount]++;
    },

    calculateScore: function () {
        var self = this;

        _.each(this.numbersHit, function (hits, numberCount) {
            if (numberCount > 0) {
                self.score += hits * Math.pow(10, numberCount - 1);
            }
        });
    },

    getDrawsPerPeriod: function () {
        return this.drawCount / this.periodCount;
    },

    getNumbersHit: function () {
        return this.numbersHit;
    },

    getScore: function () {
        return this.score;
    }
};
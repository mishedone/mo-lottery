function HotColdTrendTestData(drawSize, drawCount) {
    var numberCount;

    // initialize hit numbers
    this.numbersHit = {};
    for (numberCount = 0; numberCount <= drawSize; numberCount++) {
        this.numbersHit[numberCount] = 0;
    }

    this.drawCount = drawCount;
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

    getDrawCount: function () {
        return this.drawCount;
    },

    getNumbersHit: function () {
        return this.numbersHit;
    }
};
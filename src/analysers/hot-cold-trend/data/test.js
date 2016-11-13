function HotColdTrendTestData(drawSize, drawCount, periodCount) {
    var numberCount;

    // initialize hit numbers
    this.numbersHit = {};
    for (numberCount = 0; numberCount <= drawSize; numberCount++) {
        this.numbersHit[numberCount] = 0;
    }
    
    // initialize rising vs ranked hits
    this.risingHitCount = 0;
    this.rankedHitCount = 0;
    this.totalHitCount = 0;
    this.totalDrawnCount = 0;

    this.drawCount = drawCount;
    this.periodCount = periodCount;
    this.score = 0;
}

HotColdTrendTestData.prototype = {
    constructor: HotColdTrendTestData,

    check: function (suggestion, draw) {
        var numberCount, risingCount, rankedCount;
        
        // initialize counters
        numberCount = _.intersection(draw, suggestion.getNumbers()).length;
        risingCount = _.intersection(draw, suggestion.getRisingNumbers()).length;
        rankedCount = _.intersection(draw, suggestion.getRankedNumbers()).length;

        // update
        this.numbersHit[numberCount]++;
        this.risingHitCount += risingCount;
        this.rankedHitCount += rankedCount;
        this.totalHitCount += numberCount;
        this.totalDrawnCount += draw.length;
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
    },
    
    getRisingHitCount: function () {
        return this.risingHitCount;
    },
    
    getRisingHitPercentage: function () {
        return this.getPercentage(this.getRisingHitCount(), this.getTotalHitCount());
    },
    
    getRankedHitCount: function () {
        return this.rankedHitCount;
    },
    
    getRankedHitPercentage: function () {
        return this.getPercentage(this.getRankedHitCount(), this.getTotalHitCount());
    },
    
    getTotalHitCount: function () {
        return this.totalHitCount;
    },
    
    getTotalHitPercentage: function () {
        return this.getPercentage(this.getTotalHitCount(), this.getTotalDrawnCount());
    },
    
    getTotalDrawnCount: function () {
        return this.totalDrawnCount;
    },
    
    getPercentage: function (part, whole) {
        return ((100 * part) / whole).toFixed(2);
    }
};
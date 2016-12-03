function AuditData(drawSize) {
    var numberCount;

    // initialize hit numbers
    this.numbersHit = {};
    for (numberCount = 0; numberCount <= drawSize; numberCount++) {
        this.numbersHit[numberCount] = 0;
    }
    
    // initialize totals
    this.totalHitCount = 0;
    this.totalDrawnCount = 0;

    this.score = 0;
}

AuditData.prototype = {
    constructor: AuditData,

    check: function (suggestion, draw) {
        var numberCount = _.intersection(draw, suggestion).length;

        // update
        this.numbersHit[numberCount]++;
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

    getNumbersHit: function () {
        return this.numbersHit;
    },

    getScore: function () {
        return this.score;
    },
    
    getTotalHitCount: function () {
        return this.totalHitCount;
    },
    
    getTotalHitPercentage: function () {
        return this.getPercentage(this.totalHitCount, this.totalDrawnCount());
    },
    
    getPercentage: function (part, whole) {
        return ((100 * part) / whole).toFixed(2);
    }
};
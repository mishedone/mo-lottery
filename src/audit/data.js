function AuditData(drawSize, algorithm, periodCount, drawsPerPeriod, suggestionsConfig) {
    var numberCount;
    
    // initialize audit characteristics
    this.algorithm = algorithm;
    this.periodCount = periodCount;
    this.drawsPerPeriod = drawsPerPeriod;

    // initialize hit numbers
    this.numbersHit = {};
    for (numberCount = 0; numberCount <= drawSize; numberCount++) {
        this.numbersHit[numberCount] = 0;
    }
    
    // initialize totals
    this.score = 0;
    this.totalHitCount = 0;
    this.totalDrawnCount = 0;
    
    // the configuration passed to the analyser suggestions
    this.suggestionsConfig = suggestionsConfig;
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
    
    getAlgorithm: function () {
        return this.algorithm;
    },
    
    getPeriodCount: function () {
        return this.periodCount;
    },
    
    getDrawsPerPeriod: function () {
        return this.drawsPerPeriod;
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
        return this.getPercentage(this.totalHitCount, this.totalDrawnCount);
    },
    
    getPercentage: function (part, whole) {
        return ((100 * part) / whole).toFixed(2);
    },
    
    getSuggestionsConfig: function () {
        return this.suggestionsConfig;
    }
};
function AuditData(date, drawSize, algorithm, periodCount, drawsPerPeriod, suggestionsConfig) {
    var numberCount;
    
    this.date = date;
    
    // initialize audit characteristics
    this.algorithm = algorithm;
    this.periodCount = periodCount;
    this.drawsPerPeriod = drawsPerPeriod;

    // initialize hit numbers
    this.numbersHit = {};
    this.drawSize = drawSize;
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
    
    equals: function (auditData) {
        var me = JSON.parse(JSON.stringify(this)), other = JSON.parse(JSON.stringify(auditData));
        
        me.date = null;
        other.date = null;
        
        return (JSON.stringify(me) === JSON.stringify(other));
    },

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
    
    getDate: function () {
        return this.date;
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
    },
    
    createFromJson: function (json) {
        var date = new Date();
        
        date.setTime(Date.parse(json.date));
        this.date = date;
        this.algorithm = json.algorithm;
        this.periodCount = json.periodCount;
        this.drawsPerPeriod = json.drawsPerPeriod;
        this.numbersHit = json.numbersHit;
        this.drawSize = json.drawSize;
        this.score = json.score;
        this.totalHitCount = json.totalHitCount;
        this.totalDrawnCount = json.totalDrawnCount;
        this.suggestionsConfig = json.suggestionsConfig;
        
        return this;
    }
};
function AuditData(date, drawSize, algorithm, periodCount, drawsPerPeriod, options, suggestionsConfig) {
    var numberCount;
    
    this.date = date;
    this.lastSuggestion = null;
    
    // initialize audit characteristics
    this.algorithm = algorithm;
    this.periodCount = periodCount;
    this.drawsPerPeriod = drawsPerPeriod;
    this.options = options;

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

    getLastSuggestion: function () {
        return this.lastSuggestion;
    },
    
    getAlgorithm: function () {
        return this.algorithm;
    },

    getCleanAlgorithm: function (auditData) {
        return this.algorithm.replace('get', '').split(/(?=[A-Z])/).join(' ');
    },
    
    getPeriodCount: function () {
        return this.periodCount;
    },
    
    getDrawsPerPeriod: function () {
        return this.drawsPerPeriod;
    },
    
    getOptions: function () {
        return this.options;
    },

    getShortOptions: function (auditData) {
        var short = [];

        // old options were a string, just return them as they are
        if (!(this.options instanceof Array)) {
            return this.options;
        }

        // collect options
        _.each(this.options, function (option) {
            switch (option) {
                case 'asc':
                    short.push('A');
                    break;
                case 'desc':
                    short.push('D');
                    break;
                case 'average':
                    short.push('AVG');
                    break;
                case 'median':
                    short.push('MD');
                    break;
                default:
                    short.push(option);
            }
        });

        return short.join(' ');
    },

    getNumbersHit: function () {
        return this.numbersHit;
    },

    getScore: function () {
        return this.score;
    },
    
    getTotalHitPercentage: function () {
        return this.getPercentage(this.totalHitCount, this.totalDrawnCount);
    },
    
    getPercentage: function (part, whole) {
        return ((100 * part) / whole).toFixed(2) * 1;
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

        // support both new and old style of options
        if (json.hasOwnProperty('order')) {
            this.options = json.order;
        } else {
            this.options = json.options;
        }

        // last suggestion was introduced later
        if (json.hasOwnProperty('lastSuggestion')) {
            this.lastSuggestion = json.lastSuggestion;
        }
        
        return this;
    }
};
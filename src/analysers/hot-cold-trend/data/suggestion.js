function HotColdTrendSuggestionData(suggestCount, hitThreshold, numbersByRank) {
    this.suggestCount = suggestCount;
    this.hitThreshold = hitThreshold;
    this.numbersByRank = numbersByRank;
    
    this.risings = [];
    this.risingsNumberMap = {};
    
    this.numbers = [];
    this.risingNumbers = [];
}

HotColdTrendSuggestionData.prototype = {
    constructor: HotColdTrendSuggestionData,

    initialize: function (number, hits) {
        if (this.isNumberHot(hits)) {
            this.risings.push(new HotColdTrendRisingData(number, hits));
            this.risingsNumberMap[number] = this.risings.length - 1;
        }
    },
    
    update: function (number, hits) {
        var hasRising, rising, numberIsHot;
        
        // skip if number is not available
        hasRising = this.risingsNumberMap.hasOwnProperty(number);
        if (!hasRising) {
            return;
        }

        // update rising
        rising = this.risings[this.risingsNumberMap[number]];
        numberIsHot = this.isNumberHot(hits);
        if (numberIsHot) {
            rising.addHits(hits);
        } else {
            rising.drop();
        }
    },
    
    getNumbers: function () {
        return this.numbers;
    },
    
    getRisingNumbers: function () {
        return this.risingNumbers;
    },
    
    getRankedNumbers: function () {
        return _.difference(this.numbers, this.risingNumbers);
    },
    
    isNumberHot: function (hits) {
        return hits > this.hitThreshold;
    },
    
    finish: function () {
        this.sortRisings();
        this.suggest();
        this.sortNumbers();
    },
    
    sortRisings: function () {
        this.risings.sort(function (a, b) {
            return a.getCount() - b.getCount();
        });
        this.risings.reverse();
    },
    
    suggest: function () {
        var self = this;

        // suggest based on risings
        _.each(this.risings, function (rising) {
            var isRising = rising.getCount() > 1;
            
            if (isRising) {
                self.numbers.push(rising.getNumber());
                self.risingNumbers.push(rising.getNumber());
            }
        });

        // suggest based on passed numbers by rank
        _.each(this.numbersByRank, function (number) {
            var alreadySuggested = self.numbers.indexOf(number) != -1;

            if (!alreadySuggested) {
                self.numbers.push(number);
            }
        });
        
        // slice only the interesting part
        this.numbers = this.numbers.slice(0, this.suggestCount);
    },
    
    sortNumbers: function () {
        var sortAscending = function (a, b) {
            return a - b;
        };
        
        this.numbers.sort(sortAscending);
        this.risingNumbers.sort(sortAscending);
    }
};
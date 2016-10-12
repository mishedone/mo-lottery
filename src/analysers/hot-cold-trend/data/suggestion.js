function HotColdTrendSuggestionData(suggestCount, hitThreshold, hotNumbers) {
    this.suggestCount = suggestCount;
    this.hitThreshold = hitThreshold;
    this.hotNumbers = hotNumbers;
    this.numbers = [];
    this.risings = [];
    this.risingsNumberMap = {};
}

HotColdTrendSuggestionData.prototype = {
    constructor: HotColdTrendSuggestionData,

    initialize: function (number, hits) {
        if (this.isNumberHot(hits)) {
            this.risings.push({
                number: number,
                lastHits: hits,
                count: 1,
                dropped: false
            });
            this.risingsNumberMap[number] = this.risings.length - 1;
        }
    },
    
    update: function (number, hits) {
        var rising, hasRising, hitsAreRising, numberIsHot;
        
        // skip if number is not available
        hasRising = this.risingsNumberMap.hasOwnProperty(number);
        if (!hasRising) {
            return;
        }

        // update rising
        rising = this.risings[this.risingsNumberMap[number]];
        numberIsHot = this.isNumberHot(hits);
        hitsAreRising = hits <= rising.lastHits;
        if (!rising.dropped && numberIsHot && hitsAreRising) {
            rising.count++;
        }

        // update dropped flag - stops calculations if the number has landed the hit threshold
        if (!rising.dropped && !numberIsHot) {
            rising.dropped = true;
        }

        // move last hits to next period
        rising.lastHits = hits; 
    },
    
    getNumbers: function () {
        return this.numbers;
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
            return a.count - b.count;
        });
        this.risings.reverse();
    },
    
    suggest: function () {
        var self = this;

        // suggest based on risings
        _.each(this.risings, function (rising) {
            var isRising = rising.count > 1;
            
            if (isRising) {
                self.numbers.push(rising.number);
            }
        });

        // suggest based on passed hot numbers
        _.each(this.hotNumbers, function (number) {
            var alreadySuggested = self.numbers.indexOf(number) != -1;

            if (!alreadySuggested) {
                self.numbers.push(number);
            }
        });
        
        // slice only the interesting part
        this.numbers = this.numbers.slice(0, this.suggestCount);
    },
    
    sortNumbers: function () {
        this.numbers.sort(function (a, b) {
            return a - b;
        });
    }
};
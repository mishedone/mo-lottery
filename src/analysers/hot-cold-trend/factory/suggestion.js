function HotColdTrendSuggestionFactory() {}

HotColdTrendSuggestionFactory.prototype = {
    constructor: HotColdTrendSuggestionFactory,
    
    get: function (periods, drawSize) {
        this.map = {};
        this.risings = [];
        this.suggestions = [];
        
        // parameters
        this.periods = periods;
        this.lastPeriod = periods[0];
        this.drawSize = drawSize;
        
        // build suggestions
        this.initializeRisings();
        this.updateRisings();
        this.buildSuggestions();
        
        return this.suggestions;
    },
    
    initializeRisings: function () {
        var self = this, averageHit = this.lastPeriod.averageHit;

        _.each(this.lastPeriod.stats, function (data) {
            if (data.hits > averageHit) {
                self.risings.push({
                    number: data.number,
                    lastHits: data.hits,
                    count: 1,
                    dropped: false
                });
                self.map[data.number] = self.risings.length - 1;
            }
        });
    },
    
    updateRisings: function () {
        var self = this, averageHit = this.lastPeriod.averageHit;

        // collect risings
        _.each(this.periods.slice(1), function (period) {
            _.each(period.stats, function (data) {
                var index, dropped, hitsAreRising, numberIsHot;

                // current number was not hot in the latest period
                if (!self.map.hasOwnProperty(data.number)) {
                    return;
                }
                index = self.map[data.number];

                // update risings
                dropped = self.risings[index].dropped;
                numberIsHot = (data.hits > averageHit);
                hitsAreRising = (data.hits <= self.risings[index].lastHits);
                if (!dropped && numberIsHot && hitsAreRising) {
                    self.risings[index].count++;
                }

                // update dropped flag - stops calculations if the number has landed the average hit rate
                if (!dropped && !numberIsHot) {
                    self.risings[index].dropped = true;
                }

                // move last hits to next period
                self.risings[index].lastHits = data.hits;
            });
        });

        // sort results by risings
        this.risings.sort(function (a, b) {
            return a.count - b.count;
        });
        this.risings.reverse();
    },

    buildSuggestions: function () {
        var self = this;

        // add rising numbers
        _.each(self.risings, function (data) {
            var isRising;

            // skip all if we have enough hot numbers
            if (self.getToSuggestCount() == 0) {
                return;
            }

            isRising = (data.count > 1);
            if (isRising) {
                self.suggestions.push(data.number);
            }
        });

        // add random hottest number if we have not filled in all suggestions
        if (this.getToSuggestCount() > 0) {
            _.each(this.lastPeriod.stats, function (data) {
                var alreadySuggested, toSuggestCount;

                alreadySuggested = (self.suggestions.indexOf(data.number) != -1);
                toSuggestCount = self.getToSuggestCount();
                if (!alreadySuggested && toSuggestCount > 0) {
                    self.suggestions.push(data.number);
                }
            });
        }
        
        // order suggestions ascendingly
        this.suggestions.sort(function (a, b) {
            return a - b;
        });
    },

    getToSuggestCount: function () {
        return this.drawSize - this.suggestions.length;
    }
};
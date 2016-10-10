function HotColdTrendSuggestionFactory() {}

HotColdTrendSuggestionFactory.prototype = {
    constructor: HotColdTrendSuggestionFactory,
    
    get: function (periods) {
        var suggestion, lastPeriod;
        
        lastPeriod = periods[0];
        suggestion = new HotColdTrendSuggestionData(
            lastPeriod.getDrawSize(),
            lastPeriod.getAverageHit(),
            lastPeriod.getNumbersByRank()
        );
        
        // build suggestions
        _.each(periods, function (period, index) {
            _.each(period.stats, function (data) {
                if (index == 0) {
                    suggestion.initialize(data.number, data.hits);
                } else {
                    suggestion.update(data.number, data.hits);
                }
            });
        });
        suggestion.finish();
        
        return suggestion.getNumbers();
    }
};
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
            _.each(period.hits, function (hit) {
                if (index == 0) {
                    suggestion.initialize(hit.getNumber(), hit.getCount());
                } else {
                    suggestion.update(hit.getNumber(), hit.getCount());
                }
            });
        });
        suggestion.finish();
        
        return suggestion;
    }
};
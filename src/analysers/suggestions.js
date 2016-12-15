function AnalyserSuggestions(numbers, draws, drawSize, config) {
    this.numbers = numbers;
    this.draws = draws;
    this.drawSize = drawSize;
    this.config = config;
    
    // create results
    this.elapseTimeTrendResult = new ElapseTimeTrendAnalyser().getResult(
        this.numbers,
        this.draws,
        this.config.elapseTimeTrend.drawsPerPeriod,
        new AnalyserNumberSorter('asc')
    );
    this.hotColdTrendResult = new HotColdTrendAnalyser().getResult(
        this.numbers,
        this.draws,
        this.config.hotColdTrend.drawsPerPeriod,
        this.config.hotColdTrend.periodCount,
        new AnalyserNumberSorter('asc'),
        new AnalyserNumberSorter('asc')
    );
}

AnalyserSuggestions.prototype = {
    constructor: AnalyserSuggestions,
    
    getElapseTimeTrend: function () {
        return this.finalize(this.elapseTimeTrendResult.getElapseTimeNumbers());
    },
    
    getElapseTimeTrendGaps: function () {
        return this.finalize(this.elapseTimeTrendResult.getElapseTimeGapNumbers());
    },
    
    getHotColdTrend: function () {
        var numbers;
        
        // use rising numbers first and add hot numbers to make a full list
        numbers = this.hotColdTrendResult.getRisingNumbers();
        this.addNotSuggestedNumbers(numbers, this.hotColdTrendResult.getHotNumbers());
        
        return this.finalize(numbers);
    },
    
    getMixedRisingElapseTime: function () {
        var numbers;
        
        // use rising numbers first and add elapse time trend numbers to make a full list
        numbers = this.hotColdTrendResult.getRisingNumbers();
        this.addNotSuggestedNumbers(numbers, this.elapseTimeTrendResult.getElapseTimeNumbers());
        
        return this.finalize(numbers);
    },
    
    getMixedRisingElapseTimeGaps: function () {
        var numbers;
        
        // use rising numbers first and add elapse time trend numbers to make a full list
        numbers = this.hotColdTrendResult.getRisingNumbers();
        this.addNotSuggestedNumbers(numbers, this.elapseTimeTrendResult.getElapseTimeGapNumbers());
        
        return this.finalize(numbers);
    },
    
    finalize: function (numbers) {
        return numbers.slice(0, this.drawSize).sort(function (a, b) {
            return a - b;
        });
    },
    
    addNotSuggestedNumbers: function (numbers, add) {
        _.each(add, function (number) {
            var alreadySuggested = numbers.indexOf(number) != -1;

            if (!alreadySuggested) {
                numbers.push(number);
            }
        });
    }
};
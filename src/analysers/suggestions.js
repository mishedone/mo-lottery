function AnalyserSuggestions(numbers, draws, drawSize, config) {
    this.numbers = numbers;
    this.draws = draws;
    this.drawSize = drawSize;
    this.config = config;
    
    // create results
    this.elapseTimeTrendResult = new ElapseTimeTrendAnalyser().getResult(
        this.numbers,
        this.draws
    );
    this.hotColdTrendResult = new HotColdTrendAnalyser().getResult(
        this.numbers,
        this.draws,
        this.config.hotColdTrend.drawsPerPeriod,
        this.config.hotColdTrend.periodCount
    );
}

AnalyserSuggestions.prototype = {
    constructor: AnalyserSuggestions,
    
    getElapseTimeTrendByElapseTimes: function () {
        return this.finalize(this.elapseTimeTrendResult.getElapseTimeNumbers());
    },
    
    getElapseTimeTrendByElapseTimeGaps: function () {
        return this.finalize(this.elapseTimeTrendResult.getElapseTimeGapNumbers());
    },
    
    getHotColdTrend: function () {
        var numbers;
        
        // use rising numbers first and add hot numbers to make a full list
        numbers = this.hotColdTrendResult.getRisingNumbers();
        _.each(this.hotColdTrendResult.getHotNumbers(), function (number) {
            var alreadySuggested = numbers.indexOf(number) != -1;

            if (!alreadySuggested) {
                numbers.push(number);
            }
        });
        
        return this.finalize(numbers);
    },
    
    finalize: function (numbers) {
        return numbers.slice(0, this.drawSize).sort(function (a, b) {
            return a - b;
        });
    }
}
function AnalyserSuggestions(numbers, draws, drawSize, config) {
    var sorters = {
        asc: new AnalyserNumberSorter('asc'),
        desc: new AnalyserNumberSorter('desc')
    };
    
    this.numbers = numbers;
    this.draws = draws;
    this.drawSize = drawSize;
    this.config = this.enrichConfig(config);
    
    // create results
    this.elapseTimeTrendResult = new ElapseTimeTrendAnalyser().getResult(
        this.numbers,
        this.draws,
        this.config.elapseTimeTrend.drawsPerPeriod,
        sorters[this.config.elapseTimeTrend.elapseTimeOrder],
        sorters[this.config.elapseTimeTrend.gapDistanceOrder]
    );
    this.hotColdTrendResult = new HotColdTrendAnalyser().getResult(
        this.numbers,
        this.draws,
        this.config.hotColdTrend.drawsPerPeriod,
        this.config.hotColdTrend.periodCount,
        sorters[this.config.hotColdTrend.risingOrder],
        sorters[this.config.hotColdTrend.hotOrder]
    );
}

AnalyserSuggestions.prototype = {
    constructor: AnalyserSuggestions,
    
    enrichConfig: function (config) {
        if (!config.hasOwnProperty('elapseTimeTrend')) {
            config.elapseTimeTrend = {};
        }
        
        if (!config.hasOwnProperty('hotColdTrend')) {
            config.hotColdTrend = {};
        }
        
        return {
            elapseTimeTrend: _.extend({
                drawsPerPeriod: 100,
                elapseTimeOrder: 'asc',
                gapDistanceOrder: 'asc'
            }, config.elapseTimeTrend),
            hotColdTrend: _.extend({
                periodCount: 12,
                drawsPerPeriod: 10,
                risingOrder: 'asc',
                hotOrder: 'asc'
            }, config.hotColdTrend)
        };
    },
    
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
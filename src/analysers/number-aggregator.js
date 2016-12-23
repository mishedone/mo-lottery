function AnalyserNumberAggregator(aggregation) {
    this.aggregation = aggregation;
}

AnalyserNumberAggregator.prototype = {
    constructor: AnalyserNumberAggregator,
    
    aggregate: function (numbers) {
        if (this.aggregation == 'median') {
            return this.aggregateMedian(numbers);
        } else {
            return this.aggregateAverage(numbers);
        }
    },

    aggregateAverage: function (numbers) {
        var sum = 0;
        
        if (numbers.length == 0) {
            return null;
        }
        
        _.each(numbers, function (number) {
            sum += number;
        });
        
        return sum / numbers.length;
    },

    aggregateMedian: function (numbers) {
        var middleIndex;
        
        if (numbers.length == 0) {
            return null;
        }

        // copy numbers to prevent accidental modification
        numbers = numbers.slice();

        numbers.sort(function (a, b) {
            return a - b;
        });
        
        if (numbers.length % 2 == 0) {
            middleIndex = (numbers.length / 2) - 1;
            
            return (numbers[middleIndex] + numbers[middleIndex + 1]) / 2;
        } else {
            middleIndex = Math.floor(numbers.length / 2);
            
            return numbers[middleIndex];
        }
    }
};
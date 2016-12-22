function AnalyserSequenceAggregator(calculation) {
    this.calculation = calculation;
}

AnalyserSequenceAggregator.prototype = {
    constructor: AnalyserSequenceAggregator,
    
    aggregate: function (sequence) {
        if (this.calculation == 'median') {
            return this.calculateMedian(sequence);
        } else {
            return this.calculateAverage(sequence);
        }
    },
    
    calculateAverage: function (numbers) {
        var sum = 0;
        
        if (numbers.length == 0) {
            return null;
        }
        
        _.each(numbers, function (number) {
            sum += number;
        });
        
        return sum / numbers.length;
    },
    
    calculateMedian: function (numbers) {
        var middleIndex;
        
        if (numbers.length == 0) {
            return null;
        }
        
        if (numbers.length % 2 == 0) {
            middleIndex = (numbers.length / 2) - 1;
            
            return (numbers[middleIndex] + numbers[middleIndex + 1]) / 2;
        } else {
            middleIndex = Math.floor(numbers.length / 2);
            
            return numbers[middleIndex];
        }
    }
};
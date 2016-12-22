describe('Analyser sequence aggregator combines a row of numbers into a single value ', function () {
    it('by calculating the average', function () {
        var aggregator = new AnalyserSequenceAggregator();
        
        expect(null).toEqual(aggregator.aggregate([]));
        
        expect(3).toEqual(aggregator.aggregate([3]));
        
        expect(17).toEqual(aggregator.aggregate([3, 5, 12, 27, 38]));
    });
    
    it('by calculating the median', function () {
        var aggregator = new AnalyserSequenceAggregator('median');
        
        expect(null).toEqual(aggregator.aggregate([]));
        
        expect(7).toEqual(aggregator.aggregate([7]));
        
        expect(8).toEqual(aggregator.aggregate([3, 4, 12, 27]));
        
        expect(12).toEqual(aggregator.aggregate([3, 5, 12, 27, 38]));
    });
});
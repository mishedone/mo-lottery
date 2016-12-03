describe('Analyser suggestions suggests the best numbers to play by using ', function() {
    var numbers, draws, suggestions;

    // check the 5/35 game
    numbers = generateNumbers(1, 35);

    // create some draws
    draws = [
        [2,6,15,29,34], [1,8,17,21,31], [14,18,25,27,29], [4,7,25,27,32],
        [4,9,24,25,31], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
        [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
        [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
    ];

    // build suggestions
    suggestions = new AnalyserSuggestions(numbers, draws, 5, {
        hotColdTrend: {
            drawsPerPeriod: 8,
            periodCount: 2
        }
    });
    
    it('elapse time trend numbers ordered by elapse time', function() {
        expect([1, 2, 3, 11, 22]).toEqual(suggestions.getElapseTimeTrendByElapseTimes());
    });
    
    it('elapse time trend numbers ordered by elapse time gap', function() {
        expect([4, 5, 16, 28, 31]).toEqual(suggestions.getElapseTimeTrendByElapseTimeGaps());
    });

    it('hot-cold trend rising and hot numbers', function() {
        expect([7, 21, 30, 32, 33]).toEqual(suggestions.getHotColdTrend());
    });
});
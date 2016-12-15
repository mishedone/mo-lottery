describe('Analyser suggestions suggests the best numbers to play by using ', function () {
    var numbers, draws;

    // check the 5/35 game
    numbers = generateNumbers(1, 35);

    // create some draws
    draws = [
        [2,6,15,29,34], [1,8,17,21,35], [14,18,25,27,29], [4,7,25,27,32],
        [4,9,24,25,33], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
        [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
        [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
    ];
    
    it('elapse time trend numbers ordered by elapse time', function () {
        // check elapse time order asc
        expect([1, 2, 3, 11, 22]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            elapseTimeTrend: {
                drawsPerPeriod: 16,
                elapseTimeOrder: 'asc'
            }
        }).getElapseTimeTrend());
        // check elapse time order desc
        expect([1, 2, 3, 11, 22]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            elapseTimeTrend: {
                drawsPerPeriod: 16,
                elapseTimeOrder: 'desc'
            }
        }).getElapseTimeTrend());
    });
    
    it('elapse time trend numbers ordered by elapse time gap', function () {
        // check gap distance order asc
        expect([4, 5, 16, 28, 31]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            elapseTimeTrend: {
                drawsPerPeriod: 16,
                gapDistanceOrder: 'asc'
            }
        }).getElapseTimeTrendGaps());
        // check gap distance order desc
        expect([16, 28, 31, 33, 35]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            elapseTimeTrend: {
                drawsPerPeriod: 16,
                gapDistanceOrder: 'desc'
            }
        }).getElapseTimeTrendGaps());
    });

    it('hot-cold trend rising and hot numbers', function () {
        // check rising order asc, hot order asc
        expect([7, 21, 30, 31, 32]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            hotColdTrend: {
                periodCount: 2,
                drawsPerPeriod: 8,
                risingOrder: 'asc',
                hotOrder: 'asc'
            }
        }).getHotColdTrend());
        // check rising order asc, hot order desc
        expect([7, 21, 30, 31, 32]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            hotColdTrend: {
                periodCount: 2,
                drawsPerPeriod: 8,
                risingOrder: 'asc',
                hotOrder: 'desc'
            }
        }).getHotColdTrend());
        // check rising order desc, hot order asc
        expect([7, 21, 30, 31, 32]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            hotColdTrend: {
                periodCount: 2,
                drawsPerPeriod: 8,
                risingOrder: 'desc',
                hotOrder: 'asc'
            }
        }).getHotColdTrend());
        // check rising order desc, hot order desc
        expect([7, 21, 30, 31, 32]).toEqual(new AnalyserSuggestions(numbers, draws.slice(), 5, {
            hotColdTrend: {
                periodCount: 2,
                drawsPerPeriod: 8,
                risingOrder: 'desc',
                hotOrder: 'desc'
            }
        }).getHotColdTrend());
    });
});
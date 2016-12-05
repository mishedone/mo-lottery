describe('Hot-cold trend analyser builds a result that', function() {
    var numbers, draws, result;
    
    // check the 5/35 game
    numbers = generateNumbers(1, 35);
    
    // create some draws
    draws = [
        // period 1
        [2,6,15,29,34], [1,8,17,21,31], [14,18,25,27,29], [4,7,25,27,32],
        [4,9,24,25,31], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
        // period 2
        [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
        [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
    ];
    
    // build result
    result = new HotColdTrendAnalyser().getResult(numbers, draws, 8, 2);

    it('slices the set of draws into analysable chunks called `periods`', function() {
        var periods = result.getPeriods(), assert;

        // create assert
        assert = function (hit, number, count) {
            expect(hit.getNumber()).toEqual(number);
            expect(hit.getCount()).toEqual(count);
        };
        
        // check period count
        expect(periods.length).toEqual(2);
    
        // check period 2
        assert(periods[0].hits.get(1), 1, 0);
        assert(periods[0].hits.get(2), 2, 0);
        assert(periods[0].hits.get(3), 3, 0);
        assert(periods[0].hits.get(4), 4, 1);
        assert(periods[0].hits.get(5), 5, 1);
        assert(periods[0].hits.get(6), 6, 2);
        assert(periods[0].hits.get(7), 7, 3);
        assert(periods[0].hits.get(8), 8, 1);
        assert(periods[0].hits.get(9), 9, 2);
        assert(periods[0].hits.get(10), 10, 1);
        assert(periods[0].hits.get(11), 11, 0);
        assert(periods[0].hits.get(12), 12, 2);
        assert(periods[0].hits.get(13), 13, 1);
        assert(periods[0].hits.get(14), 14, 0);
        assert(periods[0].hits.get(15), 15, 1);
        assert(periods[0].hits.get(16), 16, 2);
        assert(periods[0].hits.get(17), 17, 1);
        assert(periods[0].hits.get(18), 18, 0);
        assert(periods[0].hits.get(19), 19, 1);
        assert(periods[0].hits.get(20), 20, 1);
        assert(periods[0].hits.get(21), 21, 3);
        assert(periods[0].hits.get(22), 22, 0);
        assert(periods[0].hits.get(23), 23, 2);
        assert(periods[0].hits.get(24), 24, 1);
        assert(periods[0].hits.get(25), 25, 0);
        assert(periods[0].hits.get(26), 26, 1);
        assert(periods[0].hits.get(27), 27, 1);
        assert(periods[0].hits.get(28), 28, 1);
        assert(periods[0].hits.get(29), 29, 1);
        assert(periods[0].hits.get(30), 30, 3);
        assert(periods[0].hits.get(31), 31, 2);
        assert(periods[0].hits.get(32), 32, 2);
        assert(periods[0].hits.get(33), 33, 2);
        assert(periods[0].hits.get(34), 34, 0);
        assert(periods[0].hits.get(35), 35, 1);
    
        // check period 1
        assert(periods[1].hits.get(1), 1, 1);
        assert(periods[1].hits.get(2), 2, 1);
        assert(periods[1].hits.get(3), 3, 0);
        assert(periods[1].hits.get(4), 4, 2);
        assert(periods[1].hits.get(5), 5, 1);
        assert(periods[1].hits.get(6), 6, 1);
        assert(periods[1].hits.get(7), 7, 1);
        assert(periods[1].hits.get(8), 8, 3);
        assert(periods[1].hits.get(9), 9, 1);
        assert(periods[1].hits.get(10), 10, 0);
        assert(periods[1].hits.get(11), 11, 0);
        assert(periods[1].hits.get(12), 12, 0);
        assert(periods[1].hits.get(13), 13, 0);
        assert(periods[1].hits.get(14), 14, 3);
        assert(periods[1].hits.get(15), 15, 1);
        assert(periods[1].hits.get(16), 16, 0);
        assert(periods[1].hits.get(17), 17, 1);
        assert(periods[1].hits.get(18), 18, 1);
        assert(periods[1].hits.get(19), 19, 2);
        assert(periods[1].hits.get(20), 20, 0);
        assert(periods[1].hits.get(21), 21, 1);
        assert(periods[1].hits.get(22), 22, 0);
        assert(periods[1].hits.get(23), 23, 1);
        assert(periods[1].hits.get(24), 24, 1);
        assert(periods[1].hits.get(25), 25, 3);
        assert(periods[1].hits.get(26), 26, 1);
        assert(periods[1].hits.get(27), 27, 2);
        assert(periods[1].hits.get(28), 28, 1);
        assert(periods[1].hits.get(29), 29, 3);
        assert(periods[1].hits.get(30), 30, 0);
        assert(periods[1].hits.get(31), 31, 4);
        assert(periods[1].hits.get(32), 32, 2);
        assert(periods[1].hits.get(33), 33, 0);
        assert(periods[1].hits.get(34), 34, 2);
        assert(periods[1].hits.get(35), 35, 0);
    });
    
    it('collects the hot numbers that are currently rising', function() {
        expect([32]).toEqual(result.getRisingNumbers());
    });
    
    it('orders the numbers in the last period by their hit count - hot numbers', function() {
        expect([
            30, 21, 7, 33, 32, 31, 23, 16, 12, 9, 6, 35, 29,
            28, 27, 26, 24, 20, 19, 17, 15, 13, 10, 8, 5, 4,
            34, 25, 22, 18, 14, 11, 3, 2, 1
        ]).toEqual(result.getHotNumbers());
    });
});


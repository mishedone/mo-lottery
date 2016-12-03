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
        assert(periods[0].hits[0], 1, 0);
        assert(periods[0].hits[1], 2, 0);
        assert(periods[0].hits[2], 3, 0);
        assert(periods[0].hits[3], 4, 1);
        assert(periods[0].hits[4], 5, 1);
        assert(periods[0].hits[5], 6, 2);
        assert(periods[0].hits[6], 7, 3);
        assert(periods[0].hits[7], 8, 1);
        assert(periods[0].hits[8], 9, 2);
        assert(periods[0].hits[9], 10, 1);
        assert(periods[0].hits[10], 11, 0);
        assert(periods[0].hits[11], 12, 2);
        assert(periods[0].hits[12], 13, 1);
        assert(periods[0].hits[13], 14, 0);
        assert(periods[0].hits[14], 15, 1);
        assert(periods[0].hits[15], 16, 2);
        assert(periods[0].hits[16], 17, 1);
        assert(periods[0].hits[17], 18, 0);
        assert(periods[0].hits[18], 19, 1);
        assert(periods[0].hits[19], 20, 1);
        assert(periods[0].hits[20], 21, 3);
        assert(periods[0].hits[21], 22, 0);
        assert(periods[0].hits[22], 23, 2);
        assert(periods[0].hits[23], 24, 1);
        assert(periods[0].hits[24], 25, 0);
        assert(periods[0].hits[25], 26, 1);
        assert(periods[0].hits[26], 27, 1);
        assert(periods[0].hits[27], 28, 1);
        assert(periods[0].hits[28], 29, 1);
        assert(periods[0].hits[29], 30, 3);
        assert(periods[0].hits[30], 31, 2);
        assert(periods[0].hits[31], 32, 2);
        assert(periods[0].hits[32], 33, 2);
        assert(periods[0].hits[33], 34, 0);
        assert(periods[0].hits[34], 35, 1);
    
        // check period 1
        assert(periods[1].hits[0], 1, 1);
        assert(periods[1].hits[1], 2, 1);
        assert(periods[1].hits[2], 3, 0);
        assert(periods[1].hits[3], 4, 2);
        assert(periods[1].hits[4], 5, 1);
        assert(periods[1].hits[5], 6, 1);
        assert(periods[1].hits[6], 7, 1);
        assert(periods[1].hits[7], 8, 3);
        assert(periods[1].hits[8], 9, 1);
        assert(periods[1].hits[9], 10, 0);
        assert(periods[1].hits[10], 11, 0);
        assert(periods[1].hits[11], 12, 0);
        assert(periods[1].hits[12], 13, 0);
        assert(periods[1].hits[13], 14, 3);
        assert(periods[1].hits[14], 15, 1);
        assert(periods[1].hits[15], 16, 0);
        assert(periods[1].hits[16], 17, 1);
        assert(periods[1].hits[17], 18, 1);
        assert(periods[1].hits[18], 19, 2);
        assert(periods[1].hits[19], 20, 0);
        assert(periods[1].hits[20], 21, 1);
        assert(periods[1].hits[21], 22, 0);
        assert(periods[1].hits[22], 23, 1);
        assert(periods[1].hits[23], 24, 1);
        assert(periods[1].hits[24], 25, 3);
        assert(periods[1].hits[25], 26, 1);
        assert(periods[1].hits[26], 27, 2);
        assert(periods[1].hits[27], 28, 1);
        assert(periods[1].hits[28], 29, 3);
        assert(periods[1].hits[29], 30, 0);
        assert(periods[1].hits[30], 31, 4);
        assert(periods[1].hits[31], 32, 2);
        assert(periods[1].hits[32], 33, 0);
        assert(periods[1].hits[33], 34, 2);
        assert(periods[1].hits[34], 35, 0);
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


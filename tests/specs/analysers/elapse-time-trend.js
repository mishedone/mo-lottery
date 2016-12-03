describe('Elapse time trend analyser builds a result that', function() {
    var numbers, draws, result;

    // check the 5/35 game
    numbers = generateNumbers(1, 35);

    // create some draws
    draws = [
        [2,6,15,29,34], [1,8,17,21,31], [14,18,25,27,29], [4,7,25,27,32],
        [4,9,24,25,31], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
        [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
        [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
    ];

    // build result
    result = new ElapseTimeTrendAnalyser().getResult(numbers, draws);

    it('calculates the gaps between each number draw in a single `period`', function() {
        var period = result.getPeriod(), assert;

        // create assert
        assert = function (hit, number, drawnIn, elapseTime, averageElapseTime, elapseTimeGap) {
            expect(hit.getNumber()).toEqual(number);
            expect(hit.drawnIn).toEqual(drawnIn);
            expect(hit.getElapseTime()).toEqual(elapseTime);
            expect(hit.getAverageElapseTime()).toEqual(averageElapseTime);
            expect(hit.getElapseTimeGap()).toEqual(elapseTimeGap);
        };

        // check results
        expect(period.drawIndex).toEqual(16);

        // first period
        assert(period.hits[0], 1, [2], 14, null, null);
        assert(period.hits[1], 2, [1], 15, null, null);
        assert(period.hits[2], 3, [], 16, null, null);
        assert(period.hits[3], 4, [4, 5, 13], 3, 5, -2);
        assert(period.hits[4], 5, [8, 12], 4, 4, 0);
        assert(period.hits[5], 6, [1, 14, 15], 1, 7, -6);
        assert(period.hits[6], 7, [4, 10, 14, 16], 0, 4, -4);
        assert(period.hits[7], 8, [2, 6, 8, 10], 6, 3, 3);
        assert(period.hits[8], 9, [5, 13, 16], 0, 6, -6);
        assert(period.hits[9], 10, [14], 2, null, null);
        assert(period.hits[10], 11, [], 16, null, null);
        assert(period.hits[11], 12, [11, 15], 1, 4, -3);
        assert(period.hits[12], 13, [12], 4, null, null);
        assert(period.hits[13], 14, [3, 6, 7], 9, 2, 7);
        assert(period.hits[14], 15, [1, 13], 3, 12, -9);
        assert(period.hits[15], 16, [14, 16], 0, 2, -2);
        assert(period.hits[16], 17, [2, 13], 3, 11, -8);
        assert(period.hits[17], 18, [3], 13, null, null);
        assert(period.hits[18], 19, [7, 8, 11], 5, 2, 3);
        assert(period.hits[19], 20, [9], 7, null, null);
        assert(period.hits[20], 21, [2, 10, 12, 15], 1, 4, -3);
        assert(period.hits[21], 22, [], 16, null, null);
        assert(period.hits[22], 23, [8, 10, 11], 5, 2, 3);
        assert(period.hits[23], 24, [5, 13], 3, 8, -5);
        assert(period.hits[24], 25, [3, 4, 5], 11, 1, 10);
        assert(period.hits[25], 26, [7, 16], 0, 9, -9);
        assert(period.hits[26], 27, [3, 4, 9], 7, 3, 4);
        assert(period.hits[27], 28, [6, 11], 5, 5, 0);
        assert(period.hits[28], 29, [1, 3, 6, 9], 7, 3, 4);
        assert(period.hits[29], 30, [11, 12, 16], 0, 3, -3);
        assert(period.hits[30], 31, [2, 5, 7, 8, 9, 15], 1, 3, -2);
        assert(period.hits[31], 32, [4, 6, 14, 15], 1, 4, -3);
        assert(period.hits[32], 33, [9, 12], 4, 3, 1);
        assert(period.hits[33], 34, [1, 7], 9, 6, 3);
        assert(period.hits[34], 35, [10], 6, null, null);
    });

    it('orders the numbers in the period by elapse time', function() {
        expect([
            22, 11, 3, 2, 1, 18, 25, 34, 14, 29, 27, 20, 35, 8, 28, 23, 19, 33, 13, 5, 24, 17,
            15, 4, 10, 32, 31, 21, 12, 6, 30, 26, 16, 9, 7
        ]).toEqual(result.getNumbersByElapseTime());
    });
    
    it('orders the numbers in the period by elapse time gap', function() {
        expect([
            4, 5, 16, 28, 31, 12, 21, 30, 32, 33, 7, 8, 19, 23, 24, 34, 6, 9, 27, 29, 17, 14, 15,
            26, 25
        ]).toEqual(result.getNumbersByElapseTimeGap());
    });
});
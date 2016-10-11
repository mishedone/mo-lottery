describe('Hot-cold trend period factory', function() {
    var factory = new HotColdTrendPeriodFactory();

    it('slices a set of draws into analysable chunks called `periods`', function() {
        var numbers = [], draws, periods, iterator, assert;

        // build available numbers set
        for (iterator = 1; iterator <= 35; iterator++) {
            numbers.push(iterator);
        }

        // create some draws
        draws = [
            // period 1
            [2,6,15,29,34], [1,8,17,21,31], [14,18,25,27,29], [4,7,25,27,32],
            [4,9,24,25,31], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
            // period 2
            [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
            [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
        ];
        
        // create assert
        assert = function (hit, number, count, rank) {
            expect(hit.getNumber()).toEqual(number);
            expect(hit.getCount()).toEqual(count);
            expect(hit.getRank()).toEqual(rank);
        };

        // check results
        periods = factory.get(numbers, draws, 2);
        expect(periods.length).toEqual(2);
        
        // first period
        assert(periods[0].hits[0], 31, 4, 1);
        assert(periods[0].hits[1], 29, 3, 2);
        assert(periods[0].hits[2], 25, 3, 2);
        assert(periods[0].hits[3], 14, 3, 2);
        assert(periods[0].hits[4], 8, 3, 2);
        assert(periods[0].hits[5], 34, 2, 6);
        assert(periods[0].hits[6], 32, 2, 6);
        assert(periods[0].hits[7], 27, 2, 6);
        assert(periods[0].hits[8], 19, 2, 6);
        assert(periods[0].hits[9], 4, 2, 6);
        assert(periods[0].hits[10], 28, 1, 11);
        assert(periods[0].hits[11], 26, 1, 11);
        assert(periods[0].hits[12], 24, 1, 11);
        assert(periods[0].hits[13], 23, 1, 11);
        assert(periods[0].hits[14], 21, 1, 11);
        assert(periods[0].hits[15], 18, 1, 11);
        assert(periods[0].hits[16], 17, 1, 11);
        assert(periods[0].hits[17], 15, 1, 11);
        assert(periods[0].hits[18], 9, 1, 11);
        assert(periods[0].hits[19], 7, 1, 11);
        assert(periods[0].hits[20], 6, 1, 11);
        assert(periods[0].hits[21], 5, 1, 11);
        assert(periods[0].hits[22], 2, 1, 11);
        assert(periods[0].hits[23], 1, 1, 11);
        assert(periods[0].hits[24], 35, 0, 25);
        // ...
        
        // second period
        assert(periods[1].hits[0], 30, 3, 1);
        assert(periods[1].hits[1], 21, 3, 1);
        assert(periods[1].hits[2], 7, 3, 1);
        assert(periods[1].hits[3], 33, 2, 4);
        assert(periods[1].hits[4], 32, 2, 4);
        assert(periods[1].hits[5], 31, 2, 4);
        assert(periods[1].hits[6], 23, 2, 4);
        assert(periods[1].hits[7], 16, 2, 4);
        assert(periods[1].hits[8], 12, 2, 4);
        assert(periods[1].hits[9], 9, 2, 4);
        assert(periods[1].hits[10], 6, 2, 4);
        assert(periods[1].hits[11], 35, 1, 12);
        assert(periods[1].hits[12], 29, 1, 12);
        assert(periods[1].hits[13], 28, 1, 12);
        assert(periods[1].hits[14], 27, 1, 12);
        assert(periods[1].hits[15], 26, 1, 12);
        assert(periods[1].hits[16], 24, 1, 12);
        assert(periods[1].hits[17], 20, 1, 12);
        assert(periods[1].hits[18], 19, 1, 12);
        assert(periods[1].hits[19], 17, 1, 12);
        assert(periods[1].hits[20], 15, 1, 12);
        assert(periods[1].hits[21], 13, 1, 12);
        assert(periods[1].hits[22], 10, 1, 12);
        assert(periods[1].hits[23], 8, 1, 12);
        assert(periods[1].hits[24], 5, 1, 12);
        assert(periods[1].hits[25], 4, 1, 12);
        assert(periods[1].hits[26], 34, 0, 27);
        // ...
    });
});


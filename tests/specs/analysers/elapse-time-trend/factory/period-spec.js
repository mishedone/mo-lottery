describe('Elapse time trend period factory', function() {
    var factory = new ElapseTimeTrendPeriodFactory();

    it('calculates the gaps between each number draw in a single `period`', function() {
        var numbers = [], draws, period, iterator, assert;

        // build available numbers set
        for (iterator = 1; iterator <= 35; iterator++) {
            numbers.push(iterator);
        }

        // create some draws
        draws = [
            [2,6,15,29,34], [1,8,17,21,31], [14,18,25,27,29], [4,7,25,27,32],
            [4,9,24,25,31], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
            [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
            [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
        ];

        // create assert
        assert = function (hit, number, drawnIn, elapseTime, averageElapseTime) {
            expect(hit.getNumber()).toEqual(number);
            expect(hit.drawnIn).toEqual(drawnIn);
            expect(hit.getElapseTime()).toEqual(elapseTime);
            expect(hit.getAverageElapseTime()).toEqual(averageElapseTime);
        };

        // check results
        period = factory.get(numbers, draws);
        expect(period.drawIndex).toEqual(16);

        // first period
        assert(period.hits[0], 1, [2], 14, null);
        assert(period.hits[1], 2, [1], 15, null);
        assert(period.hits[2], 3, [], null, null);
        assert(period.hits[3], 4, [4, 5, 13], 3, 5);
        assert(period.hits[4], 5, [8, 12], 4, 4);
        console.log(period);
    });
});
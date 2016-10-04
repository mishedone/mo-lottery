describe('Hot-cold trend period data builder', function() {
    var builder = new HotColdTrendPeriodDataBuilder();

    it('slices a set of draws into analysable chunks called `periods`', function() {
        var numbers = [], draws, periods, iterator;

        // build available numbers set
        for (iterator = 1; iterator <= 4; iterator++) {
            numbers.push(iterator);
        }

        // create some draws
        draws = [
            [1, 4], [2, 3],
            [1, 3], [2, 3],
            [1, 4], [1, 4]
        ];

        // check results
        periods = builder.get(numbers, draws, 3);
        expect(periods.length).toEqual(3);

        expect(periods[0].drawCount).toEqual(2);
        expect(periods[1].drawCount).toEqual(2);
        expect(periods[2].drawCount).toEqual(2);

        expect(periods[0].averageHit).toEqual(1);
        expect(periods[1].averageHit).toEqual(1);
        expect(periods[2].averageHit).toEqual(1);

        // exactly verify stats for first period
        expect(periods[0].stats[0]).toEqual({
            hits: 1,
            number: 4,
            rank: 1
        });
        expect(periods[0].stats[1]).toEqual({
            hits: 1,
            number: 3,
            rank: 1
        });
        expect(periods[0].stats[2]).toEqual({
            hits: 1,
            number: 2,
            rank: 1
        });
        expect(periods[0].stats[3]).toEqual({
            hits: 1,
            number: 1,
            rank: 1
        });

        // exactly verify stats for second period
        expect(periods[1].stats[0]).toEqual({
            hits: 2,
            number: 3,
            rank: 1
        });
        expect(periods[1].stats[1]).toEqual({
            hits: 1,
            number: 2,
            rank: 2
        });
        expect(periods[1].stats[2]).toEqual({
            hits: 1,
            number: 1,
            rank: 2
        });
        expect(periods[1].stats[3]).toEqual({
            hits: 0,
            number: 4,
            rank: 4
        });

        // exactly verify stats for third period
        expect(periods[2].stats[0]).toEqual({
            hits: 2,
            number: 4,
            rank: 1
        });
        expect(periods[2].stats[1]).toEqual({
            hits: 2,
            number: 1,
            rank: 1
        });
        expect(periods[2].stats[2]).toEqual({
            hits: 0,
            number: 3,
            rank: 3
        });
        expect(periods[2].stats[3]).toEqual({
            hits: 0,
            number: 2,
            rank: 3
        });
    });
});


describe('Elapse time trend analyser builds a result that', function () {
    var numbers, draws, analyser, results, sorterList, aggregatorList;

    // check the 5/35 game
    numbers = generateNumbers(1, 35);

    // create some draws
    draws = [
        [2,6,15,29,34], [1,8,17,21,35], [14,18,25,27,29], [4,7,25,27,32],
        [4,9,24,25,33], [8,14,28,29,32], [14,19,26,31,34], [5,8,19,23,31],
        [20,27,29,31,33], [7,8,21,23,35], [12,19,23,28,30], [5,13,21,30,33],
        [4,9,15,17,24], [6,7,10,16,32], [6,12,21,31,32], [7,9,16,26,30]
    ];

    // build sorter list
    sorterList = {
        asc: new AnalyserNumberSorter('asc'),
        desc: new AnalyserNumberSorter('desc')
    };

    // build aggregator list
    aggregatorList = {
        average: new AnalyserNumberAggregator('average'),
        median: new AnalyserNumberAggregator('median')
    };

    // build results for both ascending and descending order
    analyser = new ElapseTimeTrendAnalyser();
    results = {
        asc: analyser.getResult(numbers, draws, 16, aggregatorList.average, sorterList.asc, sorterList.asc),
        desc: analyser.getResult(numbers, draws, 16, aggregatorList.average, sorterList.desc, sorterList.desc),
        median: analyser.getResult(numbers, draws, 16, aggregatorList.median, sorterList.asc, sorterList.asc)
    };

    it('calculates the gaps between each number draw in a single `period`', function () {
        var assert;

        // create assert
        assert = function (hit, number, drawnIn, elapseTime, aggregateElapseTime, elapseTimeGap) {
            expect(hit.getNumber()).toEqual(number);
            expect(hit.drawnIn).toEqual(drawnIn);
            expect(hit.getElapseTime()).toEqual(elapseTime);
            expect(hit.getAggregateElapseTime()).toEqual(aggregateElapseTime);
            expect(hit.getElapseTimeGap()).toEqual(elapseTimeGap);
        };

        // check average aggregation results - they should produce the same periods
        _.each([results.asc, results.desc], function (result) {
            var period = result.getPeriod();

            // check analysed draw count
            expect(period.drawIndex).toEqual(16);

            // check hits
            assert(period.hitCollection.get(1), 1, [2], 14, null, null);
            assert(period.hitCollection.get(2), 2, [1], 15, null, null);
            assert(period.hitCollection.get(3), 3, [], 16, null, null);
            assert(period.hitCollection.get(4), 4, [4, 5, 13], 3, 5, -2);
            assert(period.hitCollection.get(5), 5, [8, 12], 4, 4, 0);
            assert(period.hitCollection.get(6), 6, [1, 14, 15], 1, 7, -6);
            assert(period.hitCollection.get(7), 7, [4, 10, 14, 16], 0, 4, -4);
            assert(period.hitCollection.get(8), 8, [2, 6, 8, 10], 6, 3, 3);
            assert(period.hitCollection.get(9), 9, [5, 13, 16], 0, 6, -6);
            assert(period.hitCollection.get(10), 10, [14], 2, null, null);
            assert(period.hitCollection.get(11), 11, [], 16, null, null);
            assert(period.hitCollection.get(12), 12, [11, 15], 1, 4, -3);
            assert(period.hitCollection.get(13), 13, [12], 4, null, null);
            assert(period.hitCollection.get(14), 14, [3, 6, 7], 9, 2, 7);
            assert(period.hitCollection.get(15), 15, [1, 13], 3, 12, -9);
            assert(period.hitCollection.get(16), 16, [14, 16], 0, 2, -2);
            assert(period.hitCollection.get(17), 17, [2, 13], 3, 11, -8);
            assert(period.hitCollection.get(18), 18, [3], 13, null, null);
            assert(period.hitCollection.get(19), 19, [7, 8, 11], 5, 2, 3);
            assert(period.hitCollection.get(20), 20, [9], 7, null, null);
            assert(period.hitCollection.get(21), 21, [2, 10, 12, 15], 1, 4, -3);
            assert(period.hitCollection.get(22), 22, [], 16, null, null);
            assert(period.hitCollection.get(23), 23, [8, 10, 11], 5, 2, 3);
            assert(period.hitCollection.get(24), 24, [5, 13], 3, 8, -5);
            assert(period.hitCollection.get(25), 25, [3, 4, 5], 11, 1, 10);
            assert(period.hitCollection.get(26), 26, [7, 16], 0, 9, -9);
            assert(period.hitCollection.get(27), 27, [3, 4, 9], 7, 3, 4);
            assert(period.hitCollection.get(28), 28, [6, 11], 5, 5, 0);
            assert(period.hitCollection.get(29), 29, [1, 3, 6, 9], 7, 3, 4);
            assert(period.hitCollection.get(30), 30, [11, 12, 16], 0, 3, -3);
            assert(period.hitCollection.get(31), 31, [7, 8, 9, 15], 1, 3, -2);
            assert(period.hitCollection.get(32), 32, [4, 6, 14, 15], 1, 4, -3);
            assert(period.hitCollection.get(33), 33, [5, 9, 12], 4, 4, 0);
            assert(period.hitCollection.get(34), 34, [1, 7], 9, 6, 3);
            assert(period.hitCollection.get(35), 35, [2, 10], 6, 8, -2);
        });

        // check median aggregation results - they should produce the same periods
        _.each([results.median], function (result) {
            var period = result.getPeriod();

            // check analysed draw count
            expect(period.drawIndex).toEqual(16);

            // check hits
            assert(period.hitCollection.get(1), 1, [2], 14, null, null);
            assert(period.hitCollection.get(2), 2, [1], 15, null, null);
            assert(period.hitCollection.get(3), 3, [], 16, null, null);
            assert(period.hitCollection.get(4), 4, [4, 5, 13], 3, 5, -2);
            assert(period.hitCollection.get(5), 5, [8, 12], 4, 4, 0);
            assert(period.hitCollection.get(6), 6, [1, 14, 15], 1, 7, -6);
            assert(period.hitCollection.get(7), 7, [4, 10, 14, 16], 0, 4, -4);
            assert(period.hitCollection.get(8), 8, [2, 6, 8, 10], 6, 2, 4);
            assert(period.hitCollection.get(9), 9, [5, 13, 16], 0, 6, -6);
            assert(period.hitCollection.get(10), 10, [14], 2, null, null);
            assert(period.hitCollection.get(11), 11, [], 16, null, null);
            assert(period.hitCollection.get(12), 12, [11, 15], 1, 4, -3);
            assert(period.hitCollection.get(13), 13, [12], 4, null, null);
            assert(period.hitCollection.get(14), 14, [3, 6, 7], 9, 2, 7);
            assert(period.hitCollection.get(15), 15, [1, 13], 3, 12, -9);
            assert(period.hitCollection.get(16), 16, [14, 16], 0, 2, -2);
            assert(period.hitCollection.get(17), 17, [2, 13], 3, 11, -8);
            assert(period.hitCollection.get(18), 18, [3], 13, null, null);
            assert(period.hitCollection.get(19), 19, [7, 8, 11], 5, 2, 3);
            assert(period.hitCollection.get(20), 20, [9], 7, null, null);
            assert(period.hitCollection.get(21), 21, [2, 10, 12, 15], 1, 3, -2);
            assert(period.hitCollection.get(22), 22, [], 16, null, null);
            assert(period.hitCollection.get(23), 23, [8, 10, 11], 5, 2, 3);
            assert(period.hitCollection.get(24), 24, [5, 13], 3, 8, -5);
            assert(period.hitCollection.get(25), 25, [3, 4, 5], 11, 1, 10);
            assert(period.hitCollection.get(26), 26, [7, 16], 0, 9, -9);
            assert(period.hitCollection.get(27), 27, [3, 4, 9], 7, 3, 4);
            assert(period.hitCollection.get(28), 28, [6, 11], 5, 5, 0);
            assert(period.hitCollection.get(29), 29, [1, 3, 6, 9], 7, 3, 4);
            assert(period.hitCollection.get(30), 30, [11, 12, 16], 0, 3, -3);
            assert(period.hitCollection.get(31), 31, [7, 8, 9, 15], 1, 1, 0);
            assert(period.hitCollection.get(32), 32, [4, 6, 14, 15], 1, 2, -1);
            assert(period.hitCollection.get(33), 33, [5, 9, 12], 4, 4, 0);
            assert(period.hitCollection.get(34), 34, [1, 7], 9, 6, 3);
            assert(period.hitCollection.get(35), 35, [2, 10], 6, 8, -2);
        });
    });

    it('orders the numbers in the period by elapse time', function () {
        expect([
            22, 11, 3, 2, 1, 18, 25, 34, 14, 29, 27, 20, 35, 8, 28, 23, 19, 33, 13, 5, 24, 17,
            15, 4, 10, 32, 31, 21, 12, 6, 30, 26, 16, 9, 7
        ]).toEqual(results.asc.getElapseTimeNumbers());
        expect([
            3, 11, 22, 2, 1, 18, 25, 14, 34, 20, 27, 29, 8, 35, 19, 23, 28, 5, 13, 33, 4, 15, 17,
            24, 10, 6, 12, 21, 31, 32, 7, 9, 16, 26, 30
        ]).toEqual(results.desc.getElapseTimeNumbers());
        expect([
            22, 11, 3, 2, 1, 18, 25, 34, 14, 29, 27, 20, 35, 8, 28, 23, 19, 33, 13, 5, 24, 17,
            15, 4, 10, 32, 31, 21, 12, 6, 30, 26, 16, 9, 7
        ]).toEqual(results.median.getElapseTimeNumbers());
    });
    
    it('orders the numbers in the period by elapse time gap', function () {
        expect([
            4, 5, 16, 28, 31, 33, 35, 12, 21, 30, 32, 7, 8, 19, 23, 24, 34, 6, 9, 27, 29, 17,
            14, 15, 26, 25
        ]).toEqual(results.asc.getElapseTimeGapNumbers());
        expect([
            35, 33, 31, 28, 16, 5, 4, 32, 30, 21, 12, 7, 34, 24, 23, 19, 8, 29, 27, 9, 6,
            17, 26, 15, 14, 25
        ]).toEqual(results.desc.getElapseTimeGapNumbers());
        expect([
            32, 4, 5, 16, 21, 28, 31, 33, 35, 12, 30, 7, 19, 23, 24, 34, 6, 8, 9, 27, 29, 17,
            14, 15, 26, 25
        ]).toEqual(results.median.getElapseTimeGapNumbers());
    });
});
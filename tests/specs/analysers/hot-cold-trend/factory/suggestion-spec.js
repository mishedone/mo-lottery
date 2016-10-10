describe('Hot-cold trend suggestion factory', function() {
    var factory = new HotColdTrendSuggestionFactory();

    it('suggests `hot` numbers to play based on a set of periods', function() {
        var period, periods = [], numbers = [], suggested, index;
        
        // build numbers
        for (index = 1; index <= 10; index++) {
            numbers.push(index);
        }

        // build some test period data
        period = new HotColdTrendPeriodData(numbers);
        period.addDraw([1, 3, 5]);
        period.addDraw([2, 4, 5]);
        period.addDraw([2, 5, 9]);
        period.finish();
        periods.push(period);
        period = new HotColdTrendPeriodData(numbers);
        period.addDraw([1, 2, 3]);
        period.addDraw([2, 3, 4]);
        period.addDraw([3, 5, 9]);
        period.finish();
        periods.push(period);
        period = new HotColdTrendPeriodData(numbers);
        period.addDraw([1, 2, 4]);
        period.addDraw([4, 5, 6]);
        period.addDraw([4, 5, 9]);
        period.finish();
        periods.push(period);

        // check results
        suggested = factory.get(periods);
        expect(suggested).toEqual([2, 5, 9]);
    });
});


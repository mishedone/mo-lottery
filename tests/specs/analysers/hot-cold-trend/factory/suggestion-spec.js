describe('Hot-cold trend suggestion factory', function() {
    var factory = new HotColdTrendSuggestionFactory();

    it('suggests `hot` numbers to play based on a set of periods', function() {
        var period, periods = [], numbers = [], suggestion, iterator;
        
        // build numbers
        for (iterator = 1; iterator <= 35; iterator++) {
            numbers.push(iterator);
        }

        // build some test period data
        period = new HotColdTrendPeriodData(numbers);
        period.addDraw([2,6,15,29,34]);
        period.addDraw([1,8,17,21,31]);
        period.addDraw([14,18,25,27,29]);
        period.addDraw([4,7,25,27,32]);
        period.addDraw([4,9,24,25,31]);
        period.addDraw([8,14,28,29,32]);
        period.addDraw([14,19,26,31,34]);
        period.addDraw([5,8,19,23,31]);
        period.finish();
        periods.push(period);
        period = new HotColdTrendPeriodData(numbers);
        period.addDraw([20,27,29,31,33]);
        period.addDraw([7,8,21,23,35]);
        period.addDraw([12,19,23,28,30]);
        period.addDraw([5,13,21,30,33]);
        period.addDraw([4,9,15,17,24]);
        period.addDraw([6,7,10,16,32]);
        period.addDraw([6,12,21,31,32]);
        period.addDraw([7,9,16,26,30]);
        period.finish();
        periods.push(period);

        // check results
        suggestion = factory.get(periods);
        expect(suggestion.getNumbers()).toEqual([14, 25, 29, 31, 32]);
    });
});


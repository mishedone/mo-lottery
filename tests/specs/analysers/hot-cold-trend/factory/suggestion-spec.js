describe('Hot-cold trend suggestion factory', function() {
    var factory = new HotColdTrendSuggestionFactory();

    it('suggests `hot` numbers to play based on a set of periods', function() {
        var periods, suggested;

        // build some test period data
        periods = [
            {
                stats: [
                    {number: 5, hits: 3},
                    {number: 2, hits: 2},
                    {number: 9, hits: 1}
                ]
            },
            {
                stats: [
                    {number: 3, hits: 4},
                    {number: 2, hits: 2},
                    {number: 9, hits: 1}
                ]
            },
            {
                stats: [
                    {number: 4, hits: 3},
                    {number: 5, hits: 2},
                    {number: 9, hits: 1}
                ]
            }
        ];

        // check results
        suggested = factory.get(periods, 2);
        expect(suggested).toEqual([2, 5]);
    });
});


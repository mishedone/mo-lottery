function HotColdTrendAnalyser(game) {
    this.game = game;
    this.draws = game.getAllDraws().reverse();
    this.periods = new HotColdTrendPeriodFactory();
    this.suggestions = new HotColdTrendSuggestionFactory();
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    suggest: function () {
        var periods = this.periods.get(
            this.game.get('numbers'),
            this.draws.slice(0, 96),
            12
        );

        return this.suggestions.get(periods, this.game.get('drawSize')).getNumbers();
    },

    test: function () {
        var tests = [], iterator;

        for (iterator = 1; iterator <= 20; iterator++) {
            tests.push(this.createTest(iterator * 12, 365));
        }

        return tests;
    },

    createTest: function (drawCount, iterations) {
        var currentIteration = 1, drawStart = 1, lastDraw, suggestion, test;

        test = new HotColdTrendTestData(this.game.get('drawSize'), drawCount);
        while (currentIteration <= iterations) {
            lastDraw = this.draws[drawStart - 1];
            suggestion = this.suggestions.get(
                this.periods.get(
                    this.game.get('numbers'),
                    this.draws.slice(drawStart, drawStart + drawCount),
                    12
                ),
                this.game.get('drawSize')
            ).getNumbers();

            // update test data
            test.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
            drawStart++;
        }

        return test;
    }
};
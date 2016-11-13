function HotColdTrendAnalyser(game) {
    this.game = game;
    this.draws = game.getAllDraws().reverse();
    this.periods = new HotColdTrendPeriodFactory();
    this.suggestions = new HotColdTrendSuggestionFactory();
    this.periodCount = 12;
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    suggest: function () {
        var periods, drawCount;

        drawCount = this.game.get('hotColdTrendDrawsPerPeriod') * this.periodCount;
        periods = this.periods.get(
            this.game.get('numbers'),
            this.draws.slice(0, drawCount),
            this.periodCount
        );

        return this.suggestions.get(periods, this.game.get('drawSize')).getNumbers();
    },

    test: function () {
        var tests = [], iterator;

        for (iterator = 1; iterator <= 20; iterator++) {
            tests.push(this.createTest(iterator * 12, 730));
        }

        // order tests by their score
        tests.sort(function (a, b) {
            return b.getScore() - a.getScore();
        });

        return tests;
    },

    createTest: function (drawCount, iterations) {
        var currentIteration = 1, drawStart = 1, lastDraw, suggestion, test;

        test = new HotColdTrendTestData(this.game.get('drawSize'), drawCount, this.periodCount);
        while (currentIteration <= iterations) {
            lastDraw = this.draws[drawStart - 1];
            suggestion = this.suggestions.get(
                this.periods.get(
                    this.game.get('numbers'),
                    this.draws.slice(drawStart, drawStart + drawCount),
                    this.periodCount
                ),
                this.game.get('drawSize')
            );

            // update test data
            test.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
            drawStart++;
        }
        test.calculateScore();

        return test;
    }
};
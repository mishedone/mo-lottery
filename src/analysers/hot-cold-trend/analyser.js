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
    }
};
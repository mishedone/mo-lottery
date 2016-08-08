function HotColdTrendSuggestions() {
    this.analyser = new HotColdTrendAnalyser(12, 8);
}

HotColdTrendSuggestions.prototype = {
    constructor: HotColdTrendSuggestions,

    reset: function (game) {
        this.game = game;
        this.result = {};
    },

    get: function (game, success) {
        var suggestions = this;

        this.reset(game);
        this.analyser.analyse(game, function (analysis) {
            suggestions.calculate(analysis);
            success(suggestions.result);
        });
    },

    calculate: function (analysis) {
        var suggestions = this;

        _.each(analysis, function (period, periodNumber) {
            _.each(period.stats, function (data) {
                // TODO: calculate suggestions in here!
            });
        });
    }
};
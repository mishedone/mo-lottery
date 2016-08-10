function HotColdTrendSuggestions() {
    this.analyser = new HotColdTrendAnalyser(12, 8);
}

HotColdTrendSuggestions.prototype = {
    constructor: HotColdTrendSuggestions,

    reset: function (game) {
        this.game = game;
        this.map = {};
        this.result = [];
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
        var suggestions = this, averageHit;

        averageHit = analysis[0].averageHit;

        // initialize result
        _.each(analysis[0].stats, function (data) {
            if (data.hits > averageHit) {
                suggestions.result.push({
                    number: data.number,
                    previousHits: data.hits,
                    risings: 1,
                    stillRising: true
                });
                suggestions.map[data.number] = suggestions.result.length - 1;
            }
        });

        // collect risings
        _.each(analysis.slice(1), function (period, periodNumber) {
            _.each(period.stats, function (data) {
                var index, hitsAreRising, numberIsHot, stillRising;

                // current number was not hot in the latest period
                if (!suggestions.map.hasOwnProperty(data.number)) {
                    return;
                }
                index = suggestions.map[data.number];

                // update risings
                stillRising = suggestions.result[index].stillRising;
                numberIsHot = (data.hits > averageHit);
                hitsAreRising = (data.hits <= suggestions.result[index].previousHits);
                if (stillRising && numberIsHot && hitsAreRising) {
                    suggestions.result[index].risings++;
                }

                // update the still rising flag - stops calculations if the number has landed the average hit rate
                if (stillRising && !numberIsHot) {
                    suggestions.result[index].stillRising = false;
                }

                // move previous hits to next period
                suggestions.result[index].previousHits = data.hits;
            });
        });

        // sort results by risings
        this.result.sort(function (a, b) {
            return a.risings - b.risings;
        });
        this.result.reverse();
    }
};
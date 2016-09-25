function HotColdTrendSuggestions() {
    this.analyser = new HotColdTrendAnalyser(12, 8);
}

HotColdTrendSuggestions.prototype = {
    constructor: HotColdTrendSuggestions,

    reset: function (game) {
        this.game = game;
        this.map = {};
        this.risings = [];
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

    initialize: function (period) {
        var suggestions = this, averageHit = period.averageHit;

        _.each(period.stats, function (data) {
            if (data.hits > averageHit) {
                suggestions.risings.push({
                    number: data.number,
                    lastHits: data.hits,
                    count: 1,
                    dropped: false
                });
                suggestions.map[data.number] = suggestions.risings.length - 1;
            }
        });
    },

    calculate: function (analysis) {
        var suggestions = this, averageHit = analysis[0].averageHit;

        this.initialize(analysis[0]);

        // collect risings
        _.each(analysis.slice(1), function (period) {
            _.each(period.stats, function (data) {
                var index, dropped, hitsAreRising, numberIsHot;

                // current number was not hot in the latest period
                if (!suggestions.map.hasOwnProperty(data.number)) {
                    return;
                }
                index = suggestions.map[data.number];

                // update risings
                dropped = suggestions.risings[index].dropped;
                numberIsHot = (data.hits > averageHit);
                hitsAreRising = (data.hits <= suggestions.risings[index].lastHits);
                if (!dropped && numberIsHot && hitsAreRising) {
                    suggestions.risings[index].count++;
                }

                // update dropped flag - stops calculations if the number has landed the average hit rate
                if (!dropped && !numberIsHot) {
                    suggestions.risings[index].dropped = true;
                }

                // move last hits to next period
                suggestions.risings[index].lastHits = data.hits;
            });
        });

        // sort results by risings
        this.risings.sort(function (a, b) {
            return a.count - b.count;
        });
        this.risings.reverse();

        this.suggest(analysis[0]);
    },

    suggest: function (lastPeriod) {
        var suggestions = this;

        // add rising numbers
        _.each(suggestions.risings, function (data) {
            var isRising;

            // skip all if we have enough hot numbers
            if (suggestions.getToSuggestCount() == 0) {
                return;
            }

            isRising = (data.count > 1);
            if (isRising) {
                suggestions.result.push(data.number);
            }
        });

        // add random hottest number if we have not filled in all suggestions
        if (suggestions.getToSuggestCount() > 0) {
            _.each(lastPeriod.stats, function (data) {
                var alreadySuggested, toSuggestCount;

                alreadySuggested = (suggestions.result.indexOf(data.number) != -1);
                toSuggestCount = suggestions.getToSuggestCount();
                if (!alreadySuggested && toSuggestCount > 0) {
                    suggestions.result.push(data.number);
                }
            });
        }
        
        // order result ascendingly
        suggestions.result.sort(function (a, b) {
            return a - b;
        });
    },

    getToSuggestCount: function () {
        return this.game.get('drawSize') - this.result.length;
    }
};
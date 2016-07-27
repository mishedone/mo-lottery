function HotColdTrendAnalyser() {
    this.reset({});
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.currentYear = null;
        this.hits = {};
    },

    analyse: function (game) {
        var analyser = this;

        analyser.reset(game);
        analyser.game.loadYears(function () {
            analyser.analyseYears();
        });
    },

    analyseYears: function () {
        var analyser = this;

        analyser.game.get('years').forEach(function (year) {
            analyser.currentYear = year.get('year');
            analyser.game.loadDraws(year.get('year'), function () {
                analyser.analyseDraws();
            });
        });
    },

    analyseDraws: function () {
        var analyser = this;

        analyser.game.getDraws(this.currentYear).forEach(function (draw) {
            _.each(draw.get('draw'), function (number) {
                if (!analyser.hits.hasOwnProperty(number)) {
                    analyser.hits[number] = 0;
                }
                analyser.hits[number]++;
            });
        });
    }
};
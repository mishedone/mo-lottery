function ElapseTimeTrendAnalyser(game) {
    this.game = game;
    this.draws = game.getAllDraws();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    suggest: function () {
        var period = new ElapseTimeTrendPeriodData(this.game.get('numbers'));

        _.each(this.draws.slice(-300), function (draw) {
            period.addDraw(draw);
        });
        period.finish();

        return period;
    }
};
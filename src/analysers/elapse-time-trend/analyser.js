function ElapseTimeTrendAnalyser(game) {
    this.game = game;
    this.draws = game.getAllDraws();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    suggest: function () {
        var periods = new ElapseTimeTrendPeriodFactory();

        return periods.get(
            this.game.get('numbers'),
            this.draws.slice(-300)
        );
    }
};
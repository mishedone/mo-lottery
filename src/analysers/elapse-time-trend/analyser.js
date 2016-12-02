function ElapseTimeTrendAnalyser(game) {
    this.game = game;
    this.draws = game.getAllDraws();
    
    // build factories
    this.periodFactory = new ElapseTimeTrendPeriodFactory();
    this.resultFactory = new ElapseTimeTrendResultFactory();
}

ElapseTimeTrendAnalyser.prototype = {
    constructor: ElapseTimeTrendAnalyser,

    suggest: function () {
        var period = this.periodFactory.get(
            this.game.get('numbers'),
            this.draws.slice(-300)
        );
        
        return this.resultFactory.get(period);
    }
};
function ElapseTimeTrendPeriodFactory() {}

ElapseTimeTrendPeriodFactory.prototype = {
    constructor: ElapseTimeTrendPeriodFactory,

    get: function (numbers, draws, hitAggregator) {
        var period = new ElapseTimeTrendPeriodData(numbers, hitAggregator);

        _.each(draws, function (draw) {
            period.addDraw(draw);
        });
        period.finish();

        return period;
    }
};
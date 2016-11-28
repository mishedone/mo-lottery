function ElapseTimeTrendPeriodFactory() {}

ElapseTimeTrendPeriodFactory.prototype = {
    constructor: ElapseTimeTrendPeriodFactory,

    get: function (numbers, draws) {
        var period = new ElapseTimeTrendPeriodData(numbers);

        _.each(draws, function (draw) {
            period.addDraw(draw);
        });
        period.finish();

        return period;
    }
};
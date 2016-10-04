function HotColdTrendPeriodFactory() {}

HotColdTrendPeriodFactory.prototype = {
    constructor: HotColdTrendPeriodFactory,
    
    get: function (numbers, draws, periodCount) {
        this.numbers = numbers;
        this.draws = draws;
        
        // periods data
        this.periodCount = periodCount;
        this.periodSize = this.draws.length / this.periodCount;
        this.periods = [];

        // build
        this.buildPeriods();
        this.finishPeriods();
        
        return this.periods;
    },
    
    buildPeriods: function () {
        var self = this, done = {}, currentPeriod = this.createPeriod();

        try {
            _.each(this.draws, function (draw) {
                if (currentPeriod.isFull(self.periodSize)) {
                    self.addPeriod(currentPeriod);
                    
                    if (self.periods.length == self.periodCount) {
                        throw done;
                    }

                    currentPeriod = self.createPeriod();
                }

                currentPeriod.addDraw(draw);
            });

            this.addPeriod(currentPeriod);
        } catch (error) {
            if (error !== done) {
                throw error;
            }
        }
    },

    finishPeriods: function () {
        _.each(this.periods, function (period) {
            period.finish();
        });
    },

    createPeriod: function () {
        return new HotColdTrendPeriodData(this.numbers);
    },
    
    addPeriod: function (period) {
        this.periods.push(period);
    }
};
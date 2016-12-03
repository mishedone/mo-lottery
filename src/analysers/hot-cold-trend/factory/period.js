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
        
        return this.periods;
    },
    
    buildPeriods: function () {
        var self = this, done = {}, currentPeriod = this.createPeriod();

        try {
            _.each(this.draws, function (draw) {
                if (currentPeriod.isFull(self.periodSize)) {
                    self.addPeriod(currentPeriod);
                    
                    // throw done exception to stop the for each loop
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

    createPeriod: function () {
        return new HotColdTrendPeriodData(this.numbers);
    },
    
    addPeriod: function (period) {
        period.finish();
        this.periods.push(period);
    }
};
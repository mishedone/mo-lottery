function ElapseTimeTrendPeriodData(numbers, hitAggregator) {
    var self = this;

    this.numbers = numbers;
    this.drawIndex = 0;

    // create hits for each available number
    this.hitCollection = new NumberCollection();
    _.each(this.numbers, function (number) {
        self.hitCollection.add(number, new ElapseTimeTrendHitData(number, hitAggregator));
    });
}

ElapseTimeTrendPeriodData.prototype = {
    constructor: ElapseTimeTrendPeriodData,

    getHits: function () {
        return this.hitCollection.extract();
    },

    addDraw: function (draw) {
        var self = this;

        // update index
        this.drawIndex++;

        // update hits for each drawn number
        _.each(draw, function (number) {
            self.hitCollection.get(number).hit(self.drawIndex);
        });
    },

    finish: function () {
        var self = this;

        _.each(this.hitCollection.get(), function (hit) {
            hit.calculateElapseTimes(self.drawIndex);
        });
    }
};
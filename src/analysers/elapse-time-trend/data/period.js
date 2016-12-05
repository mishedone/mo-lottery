function ElapseTimeTrendPeriodData(numbers) {
    var self = this;

    this.numbers = numbers;
    this.drawIndex = 0;

    // create hits for each available number
    this.hits = new NumberCollection();
    _.each(this.numbers, function (number) {
        self.hits.add(number, new ElapseTimeTrendHitData(number));
    });
}

ElapseTimeTrendPeriodData.prototype = {
    constructor: ElapseTimeTrendPeriodData,

    getHits: function () {
        return this.hits.extract();
    },

    addDraw: function (draw) {
        var self = this;

        // update index
        this.drawIndex++;

        // update hits for each drawn number
        _.each(draw, function (number) {
            self.hits.get(number).hit(self.drawIndex);
        });
    },

    finish: function () {
        var self = this;

        _.each(this.hits.get(), function (hit) {
            hit.calculateElapseTimes(self.drawIndex);
        });
    }
};
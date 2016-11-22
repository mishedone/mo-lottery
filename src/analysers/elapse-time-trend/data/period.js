function ElapseTimeTrendPeriodData(numbers) {
    var self = this;

    this.numbers = numbers;
    this.drawIndex = 0;

    // create hits for each available number and cache number index map
    this.hits = [];
    this.hitsNumberMap = {};
    _.each(this.numbers, function (number) {
        self.hits.push(new ElapseTimeTrendHitData(number));
        self.hitsNumberMap[number] = self.hits.length - 1;
    });
}

ElapseTimeTrendPeriodData.prototype = {
    constructor: ElapseTimeTrendPeriodData,

    addDraw: function (draw) {
        var self = this;

        // update index
        this.drawIndex++;

        // update hits for each drawn number
        _.each(draw, function (number) {
            self.hits[self.hitsNumberMap[number]].hit(self.drawIndex);
        });
    },

    finish: function () {
        var self = this;

        _.each(this.hits, function (hit) {
            hit.calculateElapseTimes(self.drawIndex);
        });
    }
};
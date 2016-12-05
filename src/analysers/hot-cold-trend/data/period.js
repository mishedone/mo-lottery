function HotColdTrendPeriodData(numbers) {
    var self = this;

    this.numbers = numbers;
    this.drawSize = 0;
    this.drawCount = 0;
    this.averageHit = 0;

    // create hits for each available number
    this.hitCollection = new NumberCollection();
    _.each(this.numbers, function (number) {
        self.hitCollection.add(number, new HotColdTrendHitData(number));
    });
}

HotColdTrendPeriodData.prototype = {
    constructor: HotColdTrendPeriodData,
    
    getHits: function () {
        return this.hitCollection.extract();
    },
    
    getAverageHit: function () {
        return this.averageHit;
    },

    isFull: function (fullDrawCount) {
        return this.drawCount == fullDrawCount;
    },

    addDraw: function (draw) {
        var self = this;

        // update hits for each drawn number
        _.each(draw, function (number) {
            self.hitCollection.get(number).hit();
        });

        // update counters
        this.drawCount++;
        this.drawSize = draw.length;
    },

    finish: function () {
        this.averageHit = Math.round(
            (this.drawCount * this.drawSize) /
            this.numbers.length
        );
    }
};
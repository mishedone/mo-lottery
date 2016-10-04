function HotColdTrendPeriodData(numbers) {
    var self = this;

    this.numbers = numbers;
    this.drawSize = 0;
    this.drawCount = 0;
    this.averageHit = 0;

    // create stats for each available number and cache number index map
    this.stats = [];
    this.statsNumberMap = {};
    _.each(this.numbers, function (number) {
        self.stats.push({
            number: number,
            hits: 0
        });
        self.statsNumberMap[number] = self.stats.length - 1;
    });
}

HotColdTrendPeriodData.prototype = {
    constructor: HotColdTrendPeriodData,

    isFull: function (fullDrawCount) {
        return this.drawCount == fullDrawCount;
    },

    addDraw: function (draw) {
        var self = this;

        // update stats for each hit numbers
        _.each(draw, function (number) {
            self.stats[self.getNumberIndex(number)].hits++;
        });

        // update counters
        this.drawCount++;
        this.drawSize = draw.length;
    },

    getNumberIndex: function (number) {
        return this.statsNumberMap[number];
    },

    finish: function () {
        this.calculateRanks();
        this.calculateAverageHits();
    },

    calculateRanks: function () {
        var self = this, currentRank = 0, lastHits = 0, hitsWithSameRank = 1;

        // sort ranks by hits in a reverse order
        this.stats.sort(function (a, b) {
            return a.hits - b.hits;
        });
        this.stats.reverse();

        // calculate ranks
        _.each(this.stats, function (data, index) {
            if (lastHits != data.hits) {
                currentRank = currentRank + hitsWithSameRank;
                hitsWithSameRank = 1;
            } else {
                hitsWithSameRank++;
            }

            lastHits = data.hits;
            self.stats[index].rank = currentRank;
        });
    },

    calculateAverageHits: function () {
        this.averageHit = Math.round(
            (this.drawCount * this.drawSize) /
            this.numbers.length
        );
    }
};
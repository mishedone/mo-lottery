function HotColdTrendPeriodData(numbers) {
    var self = this;

    this.numbers = numbers;
    this.drawSize = 0;
    this.drawCount = 0;
    this.averageHit = 0;

    // create hits for each available number and cache number index map
    this.hits = [];
    this.hitsNumberMap = {};
    _.each(this.numbers, function (number) {
        self.hits.push(new HotColdTrendHitData(number));
        self.hitsNumberMap[number] = self.hits.length - 1;
    });
    
    // numbers by rank - output purpose structure
    this.numbersByRank = [];
}

HotColdTrendPeriodData.prototype = {
    constructor: HotColdTrendPeriodData,

    isFull: function (fullDrawCount) {
        return this.drawCount == fullDrawCount;
    },

    addDraw: function (draw) {
        var self = this;

        // update hits for each drawn number
        _.each(draw, function (number) {
            self.hits[self.hitsNumberMap[number]].hit();
        });

        // update counters
        this.drawCount++;
        this.drawSize = draw.length;
    },
    
    getDrawSize: function () {
        return this.drawSize;
    },
    
    getAverageHit: function () {
        return this.averageHit;
    },
    
    getNumbersByRank: function () {
        return this.numbersByRank;
    },

    finish: function () {
        this.calculateRanks();
        this.calculateAverageHit();
        this.buildNumbersByRank();
    },

    calculateRanks: function () {
        var self = this, currentRank = 0, lastHits = 0, hitsWithSameRank = 1;

        // sort hits by count and number in a reverse order
        this.hits.sort(function (a, b) {
            if (a.getCount() == b.getCount()) {
                return a.getNumber() - b.getNumber();
            }
            
            return a.getCount() - b.getCount();
        });
        this.hits.reverse();

        // calculate ranks
        _.each(this.hits, function (hit, index) {
            if (lastHits != hit.getCount()) {
                currentRank = currentRank + hitsWithSameRank;
                hitsWithSameRank = 1;
            } else {
                hitsWithSameRank++;
            }

            lastHits = hit.getCount();
            self.hits[index].setRank(currentRank);
        });
    },

    calculateAverageHit: function () {
        this.averageHit = Math.round(
            (this.drawCount * this.drawSize) /
            this.numbers.length
        );
    },
    
    buildNumbersByRank: function () {
        var self = this;
        
        _.each(this.hits, function (hit) {
            self.numbersByRank.push(hit.getNumber());
        });
    }
};
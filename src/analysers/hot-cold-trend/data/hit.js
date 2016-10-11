function HotColdTrendHitData(number) {
    this.number = number;
    this.count = 0;
    this.rank = 0;
}

HotColdTrendHitData.prototype = {
    constructor: HotColdTrendHitData,
    
    getNumber: function () {
        return this.number;
    },
    
    getCount: function () {
        return this.count;
    },
    
    hit: function () {
        this.count++;
    },
    
    getRank: function () {
        return this.rank;
    },
    
    setRank: function (rank) {
        this.rank = rank;
    }
};
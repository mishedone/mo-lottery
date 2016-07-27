function HotColdTrendAnalyser(gameReader, periodSize) {
    this.reset({});
    this.gameReader = gameReader;
    this.periodSize = periodSize;
    
    // listen to game reader read finished events
    this.listenTo(this.gameReader, 'read:finished', this.analyseDraws);
}

HotColdTrendAnalyser.prototype = _.extend({}, Backbone.Events, {
    constructor: HotColdTrendAnalyser,

    reset: function (game) {
        this.game = game;
        this.hits = {};
    },

    analyse: function (game) {
        this.reset(game);
        this.gameReader.read(game);
    },

    analyseDraws: function (draws) {
        var analyser = this;
        
        _.each(draws, function (yearDraws, year) {
            _.each(yearDraws, function (draw) {
                _.each(draw, function (number) {
                    analyser.hit(number);
                });
            });
        });
    },
    
    hit: function (number) {
        if (!this.hits.hasOwnProperty(number)) {
            this.hits[number] = 0;
        }
        this.hits[number]++;
    }
});
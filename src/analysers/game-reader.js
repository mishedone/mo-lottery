function GameReader() {
    this.reset({});
}

GameReader.prototype = _.extend({}, Backbone.Events, {
    constructor: GameReader,
    
    reset: function (game) {
        this.game = game;
        this.draws = {};
        this.lastYear = null;
    },
    
    read: function (game) {
        var reader = this;
        
        reader.reset(game);
        reader.game.loadYears(function () {
            reader.readYears()
        });
    },
    
    readYears: function () {
        var reader = this, years;
        
        years = reader.game.get('years');
        reader.lastYear = years.last().get('year');
        years.forEach(function (year) {
            reader.game.loadDraws(year.get('year'), function () {
                reader.readDraws(year.get('year'));
            });
        });
    },
    
    readDraws: function (year) {
        var reader = this;
        
        reader.draws[year] = [];
        reader.game.getDraws(year).forEach(function (draw) {
            reader.draws[year].push(draw.get('draw'));
        });
        
        // trigger reading finished event on last year
        if (reader.lastYear == year) {
            reader.trigger('read:finished', reader.draws);
        }
    }
});
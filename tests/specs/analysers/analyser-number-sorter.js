describe('Analyser number sorter can sort arrays of objects ', function () {
    var objects, Data;
    
    Data = function (number, count) {
        this.number = number;
        this.count = count;
    };
    
    Data.prototype = {
        constructor: Data,
        
        getNumber: function () {
            return this.number;
        },
        
        getCount: function () {
            return this.count;
        }
    };
    
    objects = [
        new Data(1, 3),
        new Data(2, 14),
        new Data(3, 3)
    ];
    
    it('by primary (asc) and secondary (asc by default) property', function () {
        var sorter = new AnalyserNumberSorter(), numbers = [];
        
        sorter.sort(objects, 'getCount', 'getNumber');
        
        _.each(objects, function (object) {
            numbers.push(object.getNumber());
        });
        
        expect([1, 3, 2]).toEqual(numbers);
    });
    
    it('by primary (asc) and secondary (desc if configured so) property', function () {
        var sorter = new AnalyserNumberSorter('desc'), numbers = [];
        
        sorter.sort(objects, 'getCount', 'getNumber');
        
        _.each(objects, function (object) {
            numbers.push(object.getNumber());
        });
        
        expect([3, 1, 2]).toEqual(numbers);
    });
});
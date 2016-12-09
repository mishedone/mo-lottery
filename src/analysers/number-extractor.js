function AnalyserNumberExtractor() {}

AnalyserNumberExtractor.prototype = {
    constructor: AnalyserNumberExtractor,
    
    extract: function (objects) {
        var numbers = [];

        _.each(objects, function (object) {
            numbers.push(object.getNumber());
        });
    
        return numbers;
    }
}
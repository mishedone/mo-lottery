function AnalyserNumberSorter(order) {
    this.order = order;
}

AnalyserNumberSorter.prototype = {
    constructor: AnalyserNumberSorter,
    
    sort: function (objects, primary, secondary) {
        var self = this;
        
        objects.sort(function (a, b) {
            if (a[primary]() == b[primary]()) {
                if (self.order == 'desc') {
                    return b[secondary]() - a[secondary]();
                }
                
                return a[secondary]() - b[secondary]();
            }

            return a[primary]() - b[primary]();
        });
    }
};
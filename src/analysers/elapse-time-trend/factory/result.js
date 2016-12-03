function ElapseTimeTrendResultFactory() {}

ElapseTimeTrendResultFactory.prototype = {
    constructor: ElapseTimeTrendResultFactory,

    get: function (period) {
        return new ElapseTimeTrendResultData(
            period,
            this.getElapseTimeNumbers(period.getHits()),
            this.getElapseTimeGapNumbers(period.getHits())
        );
    },

    getElapseTimeNumbers: function (hits) {
        // sort hits by elapse time
        // HINT: there is a known bug here - if the period is not long enough
        // elapse times of 0 and null would be considered equal
        // FIX: just make sure periods are long enough
        hits.sort(function (a, b) {
            if (a.getElapseTime() == b.getElapseTime()) {
                return a.getNumber() - b.getNumber();
            }

            return a.getElapseTime() - b.getElapseTime();
        });
        hits.reverse();

        return this.getNumbersFromHits(hits);
    },
    
    getElapseTimeGapNumbers: function (hits) {
        // remove hits that have no elapse time gap
        hits = _.filter(hits, function (hit) {
            return (hit.getElapseTimeGap() != null);
        });
        
        // sort hits by elapse time gap distance to -1
        // HINT: we are using -1 as a 0 by moving all numbers one position to the right (+1),
        // than by applying an absolute value we get the distance
        hits.sort(function (a, b) {
            var aDistance, bDistance;
            
            aDistance = Math.abs(a.getElapseTimeGap() + 1);
            bDistance = Math.abs(b.getElapseTimeGap() + 1);
            
            if (aDistance == bDistance) {
                return a.getNumber() - b.getNumber();
            }

            return aDistance - bDistance;
        });
        
        return this.getNumbersFromHits(hits);
    },
    
    getNumbersFromHits: function (hits) {
        var numbers = [];
        
        _.each(hits, function (hit) {
            numbers.push(hit.getNumber());
        });
        
        return numbers;
    } 
};
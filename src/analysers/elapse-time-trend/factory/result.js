function ElapseTimeTrendResultFactory() {}

ElapseTimeTrendResultFactory.prototype = {
    constructor: ElapseTimeTrendResultFactory,

    get: function (period) {
        return new ElapseTimeTrendResultData(
            this.getNumbersByElapseTime(period.getHits()),
            []
        );
    },

    getNumbersByElapseTime: function (hits) {
        var numbers = [];

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

        // collect numbers
        _.each(hits, function (hit) {
            numbers.push(hit.getNumber());
        });

        return numbers;
    }
};
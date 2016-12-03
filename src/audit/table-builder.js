function AuditTableBuilder(game) {
    this.game = game;
    this.draws = game.getAllDraws();
}

AuditTableBuilder.prototype = {
    constructor: AuditTableBuilder,
    
    getHotColdTrendTable: function () {
        var table = new AuditTable('Hot-cold Trend'), numberCount, drawsPerPeriod, auditData;
        
        // add labels
        table.addLabel('Draws per period');
        numberCount = 0;
        while (numberCount <= this.game.get('drawSize')) {
            table.addLabel('Hit ' + numberCount);
            numberCount++;
        }
        table.addLabel('Score');
        table.addLabel('Total hits');
        table.addLabel('Total hit %');
        
        // add rows
        for (drawsPerPeriod = 1; drawsPerPeriod <= 20; drawsPerPeriod++) {
            table.addData(drawsPerPeriod);
            auditData = this.getHotColdTrendAuditData(drawsPerPeriod, 30);
            _.each(auditData.getNumbersHit(), function (hits, numberCount) {
                table.addData(hits);
            });
            table.addData(auditData.getScore());
            table.addData(auditData.getTotalHitCount());
            table.addData(auditData.getTotalHitPercentage());
            table.endRow();
        }

        return table;
    },
    
    getHotColdTrendAuditData: function (drawsPerPeriod, iterations) {
        var currentIteration = 1, lastDraw, suggestion, auditData;
        
        auditData = new AuditData(this.game.get('drawSize'));
        while (currentIteration <= iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.game.get('numbers'),
                this.draws.slice(0, currentIteration * -1),
                this.game.get('drawSize'),
                {
                    hotColdTrend: {
                        drawsPerPeriod: drawsPerPeriod,
                        periodCount: 12
                    }
                }
            ).getHotColdTrend();

            // update audit data
            auditData.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
        }
        auditData.calculateScore();

        return auditData;
    }
}
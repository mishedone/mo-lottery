function AuditTableBuilder(game) {
    var weeksPerYear = 52;
    
    this.game = game;
    this.numbers = game.get('numbers');
    this.drawSize = game.get('drawSize');
    this.drawsPerWeek = game.get('drawsPerWeek');
    this.draws = game.getAllDraws();
    
    // use 6 months for now
    this.iterations = (weeksPerYear * this.drawsPerWeek) / 2;
}

AuditTableBuilder.prototype = {
    constructor: AuditTableBuilder,
    
    get: function () {
        var table = new AuditTable('Audit'), iterator;
        
        // add labels
        this.addAuditDataLabels(table);
        
        // add data
        this.addAuditDataRow(table, this.getAuditData('ElapseTimeTrend', 1, 300));
        this.addAuditDataRow(table, this.getAuditData('ElapseTimeTrendGaps', 1, 300));
        for (iterator = 10; iterator <= 20; iterator++) {
            this.addAuditDataRow(table, this.getAuditData('HotColdTrend', 12, iterator));
        }
        
        // sort data by score
        table.sort(5 + this.drawSize);
        
        return table;
    },
    
    getAuditData: function (algorithm, periodCount, drawsPerPeriod) {
        var currentIteration = 1, lastDraw, suggestion, auditData;
        
        auditData = new AuditData(this.drawSize, algorithm, periodCount, drawsPerPeriod);
        while (currentIteration <= this.iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.numbers,
                this.draws.slice(0, currentIteration * -1),
                this.drawSize,
                this.getSuggestionsConfig(periodCount, drawsPerPeriod)
            )['get' + algorithm]();

            // update audit data
            auditData.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
        }
        auditData.calculateScore();

        return auditData;
    },
    
    addAuditDataLabels: function (table) {
        var numberCount = 0;
        
        table.addLabel('Algorithm');
        table.addLabel('Period count');
        table.addLabel('Draws per period');
        
        while (numberCount <= this.drawSize) {
            table.addLabel('Hit ' + numberCount);
            numberCount++;
        }
        
        table.addLabel('Score');
        table.addLabel('Total hits');
        table.addLabel('Total hit %');
    },
    
    addAuditDataRow: function (table, auditData) {
        table.addData(auditData.getAlgorithm());
        table.addData(auditData.getPeriodCount());
        table.addData(auditData.getDrawsPerPeriod());
        
        _.each(auditData.getNumbersHit(), function (hits, numberCount) {
            table.addData(hits);
        });
        
        table.addData(auditData.getScore());
        table.addData(auditData.getTotalHitCount());
        table.addData(auditData.getTotalHitPercentage());
        
        table.endRow();
    },
    
    getSuggestionsConfig: function (periodCount, drawsPerPeriod) {
        return {
            hotColdTrend: {
                periodCount: periodCount,
                drawsPerPeriod: drawsPerPeriod
            }
        };
    }
}
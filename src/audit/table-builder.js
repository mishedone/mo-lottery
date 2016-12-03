function AuditTableBuilder(game) {
    this.game = game;
    this.drawSize = game.get('drawSize');
    this.draws = game.getAllDraws();
    this.iterations = 730;
}

AuditTableBuilder.prototype = {
    constructor: AuditTableBuilder,
    
    getElapseTimeTrendTable: function () {
        var table = new AuditTable('Elapse Time Trend'), currentIteration = 1, lastDraw, suggestion, auditData;
        
        // add labels
        this.addAuditDataLabels(table);
        
        // build audit data
        auditData = new AuditData(this.drawSize);
        while (currentIteration <= this.iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.game.get('numbers'),
                this.draws.slice(0, currentIteration * -1),
                this.game.get('drawSize'),
                this.getSuggestionsConfig(1, 1)
            ).getElapseTimeTrend();

            // update audit data
            auditData.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
        }
        auditData.calculateScore();
        
        // add rows
        this.addAuditDataRows(table, auditData);
        
        return table;
    },
    
    getElapseTimeTrendGapsTable: function () {
        var table = new AuditTable('Elapse Time Trend - Gaps'), currentIteration = 1, lastDraw, suggestion, auditData;
        
        // add labels
        this.addAuditDataLabels(table);
        
        // build audit data
        auditData = new AuditData(this.drawSize);
        while (currentIteration <= this.iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.game.get('numbers'),
                this.draws.slice(0, currentIteration * -1),
                this.game.get('drawSize'),
                this.getSuggestionsConfig(1, 1)
            ).getElapseTimeTrendGaps();

            // update audit data
            auditData.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
        }
        auditData.calculateScore();
        
        // add rows
        this.addAuditDataRows(table, auditData);
        
        return table;
    },
    
    getHotColdTrendTable: function () {
        var table = new AuditTable('Hot-cold Trend'), drawsPerPeriod, auditData;
        
        // add labels
        table.addLabel('Draws per period');
        this.addAuditDataLabels(table);
        
        // add rows
        for (drawsPerPeriod = 1; drawsPerPeriod <= 20; drawsPerPeriod++) {
            table.addData(drawsPerPeriod);
            auditData = this.getHotColdTrendAuditData(drawsPerPeriod);
            this.addAuditDataRows(table, auditData);
            table.endRow();
        }
        table.sort(3 + this.drawSize);

        return table;
    },
    
    getHotColdTrendAuditData: function (drawsPerPeriod) {
        var currentIteration = 1, lastDraw, suggestion, auditData;
        
        auditData = new AuditData(this.game.get('drawSize'));
        while (currentIteration <= this.iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.game.get('numbers'),
                this.draws.slice(0, currentIteration * -1),
                this.game.get('drawSize'),
                this.getSuggestionsConfig(drawsPerPeriod, 12)
            ).getHotColdTrend();

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
        
        while (numberCount <= this.drawSize) {
            table.addLabel('Hit ' + numberCount);
            numberCount++;
        }
        
        table.addLabel('Score');
        table.addLabel('Total hits');
        table.addLabel('Total hit %');
    },
    
    addAuditDataRows: function (table, auditData) {
        _.each(auditData.getNumbersHit(), function (hits, numberCount) {
            table.addData(hits);
        });
        table.addData(auditData.getScore());
        table.addData(auditData.getTotalHitCount());
        table.addData(auditData.getTotalHitPercentage());
    },
    
    getSuggestionsConfig: function (drawsPerPeriod, periodCount) {
        return {
            hotColdTrend: {
                drawsPerPeriod: drawsPerPeriod,
                periodCount: periodCount
            }
        };
    }
}
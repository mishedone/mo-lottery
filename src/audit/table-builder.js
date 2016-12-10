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
        var table = new AuditTable('Audit'), config, i, j;
        
        // add labels
        this.addAuditDataLabels(table);
        
        // add elapse time trend data
        for (i= 150; i <= 250; i++) {
            config = this.getSuggestionsConfig({
                drawsPerPeriod: i
            }, {});
            this.addAuditDataRow(table, this.getAuditData('ElapseTimeTrend', 1, i, config));
            this.addAuditDataRow(table, this.getAuditData('ElapseTimeTrendGaps', 1, i, config));
        }
    
        // add hot-cold trend data
        for (i = 5; i <= 20; i++) {
            config = this.getSuggestionsConfig({}, {
                periodCount: 12,
                drawsPerPeriod: i
            });
            this.addAuditDataRow(table, this.getAuditData('HotColdTrend', 12, i, config));
        }
        
        // add mixed data
        for (i= 5; i <= 20; i++) {
            for (j = 15; j <= 25; j++) {
                config = this.getSuggestionsConfig({
                    drawsPerPeriod: j * 10
                }, {
                    periodCount: 12,
                    drawsPerPeriod: i
                });
                this.addAuditDataRow(table, this.getAuditData(
                    'MixedRisingElapseTime', '12/1', i + '/' + (j * 10), config
                ));
                this.addAuditDataRow(table, this.getAuditData(
                    'MixedRisingElapseTimeGaps', '12/1', i + '/' + (j * 10), config
                ));
            }
        }
        
        // sort data by score
        table.sort(5 + this.drawSize);
        
        return table;
    },
    
    getAuditData: function (algorithm, periodCount, drawsPerPeriod, suggestionsConfig) {
        var currentIteration = 1, lastDraw, suggestion, auditData;
        
        auditData = new AuditData(
            this.drawSize,
            algorithm,
            periodCount,
            drawsPerPeriod,
            suggestionsConfig
        );
        while (currentIteration <= this.iterations) {
            lastDraw = this.draws[this.draws.length - currentIteration];
            suggestion = new AnalyserSuggestions(
                this.numbers,
                this.draws.slice(0, currentIteration * -1),
                this.drawSize,
                suggestionsConfig
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
    
    addAuditDataRow: function (table, auditData, config) {
        table.startRow(auditData.getSuggestionsConfig());
        
        table.addData(auditData.getAlgorithm());
        table.addData(auditData.getPeriodCount());
        table.addData(auditData.getDrawsPerPeriod());
        
        _.each(auditData.getNumbersHit(), function (hits, numberCount) {
            table.addData(hits);
        });
        
        table.addData(auditData.getScore());
        table.addData(auditData.getTotalHitCount());
        table.addData(auditData.getTotalHitPercentage());
    },
    
    getSuggestionsConfig: function (elapseTimeTrend, hotColdTrend) {
        return {
            elapseTimeTrend: _.extend({
                drawsPerPeriod: 1
            }, elapseTimeTrend),
            hotColdTrend: _.extend({
                periodCount: 1,
                drawsPerPeriod: 1
            }, hotColdTrend)
        };
    }
}
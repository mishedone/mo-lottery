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
        var table = new AuditTable('Audit', this.drawSize), config, i, j;
        
        // add elapse time trend data
        for (i= 150; i <= 250; i++) {
            config = this.getSuggestionsConfig({
                drawsPerPeriod: i
            }, {});
            table.addRow(this.getAuditData('getElapseTimeTrend', 1, i, config));
            table.addRow(this.getAuditData('getElapseTimeTrendGaps', 1, i, config));
        }
    
        // add hot-cold trend data
        for (i = 5; i <= 20; i++) {
            config = this.getSuggestionsConfig({}, {
                periodCount: 12,
                drawsPerPeriod: i
            });
            table.addRow(this.getAuditData('getHotColdTrend', 12, i, config));
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
                table.addRow(this.getAuditData(
                    'getMixedRisingElapseTime', '12/1', i + '/' + (j * 10), config
                ));
                table.addRow(this.getAuditData(
                    'getMixedRisingElapseTimeGaps', '12/1', i + '/' + (j * 10), config
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
            )[algorithm]();

            // update audit data
            auditData.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
        }
        auditData.calculateScore();

        return auditData;
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
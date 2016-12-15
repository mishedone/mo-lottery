function AuditTableBuilder() {
    this.orderList = [
        ['asc', 'asc'],
        ['asc', 'desc'],
        ['desc', 'asc'],
        ['desc', 'desc']
    ];
}

AuditTableBuilder.prototype = {
    constructor: AuditTableBuilder,
    
    get: function (game) {
        var self = this, table, weeksPerYear = 52;
        
        this.setGame(game);
        table = new AuditTable('Audit', this.drawSize);
        
        // use 6 months for now
        this.iterations = (weeksPerYear * this.drawsPerWeek) / 2;
        
        // add elapse time trend data
        _.each(this.orderList, function (orders) {
            var config, order, i;
            
            for (i = 150; i <= 250; i++) {
                config = {
                    elapseTimeTrend: {
                        drawsPerPeriod: i,
                        elapseTimeOrder: orders[0],
                        gapDistanceOrder: orders[1]
                    }  
                };
                order = self.getOrderString(orders);
                table.addRow(self.getAuditData('getElapseTimeTrend', 1, i, order, config));
                table.addRow(self.getAuditData('getElapseTimeTrendGaps', 1, i, order, config));
            }
        });
    
        // add hot-cold trend data
        _.each(this.orderList, function (orders) {
            var config, order, i;
            
            for (i = 5; i <= 20; i++) {
                config = {
                    hotColdTrend: {
                        periodCount: 12,
                        drawsPerPeriod: i,
                        risingOrder: orders[0],
                        hotOrder: orders[1]
                    }
                };
                order = self.getOrderString(orders);
                table.addRow(self.getAuditData('getHotColdTrend', 12, i, order, config));
            }
        });
        
        // add mixed rising elapse time
        _.each(this.orderList, function (orders) {
            var config, order, i, j;
            
            for (i = 5; i <= 20; i++) {
                for (j = 15; j <= 25; j++) {
                    config = {
                        elapseTimeTrend: {
                            drawsPerPeriod: j * 10,
                            elapseTimeOrder: orders[0]
                        },
                        hotColdTrend: {
                            periodCount: 12,
                            drawsPerPeriod: i,
                            risingOrder: orders[1]
                        }
                    };
                    order = self.getOrderString(orders);
                    table.addRow(self.getAuditData(
                        'getMixedRisingElapseTime', '12/1', i + '/' + (j * 10), order, config
                    ));
                }
            }
        });
        
        // add mixed rising elapse time
        _.each(this.orderList, function (orders) {
            var config, order, i, j;
            
            for (i = 5; i <= 20; i++) {
                for (j = 15; j <= 25; j++) {
                    config = {
                        elapseTimeTrend: {
                            drawsPerPeriod: j * 10,
                            gapDistanceOrder: orders[0]
                        },
                        hotColdTrend: {
                            periodCount: 12,
                            drawsPerPeriod: i,
                            risingOrder: orders[1]
                        }
                    };
                    order = self.getOrderString(orders);
                    table.addRow(self.getAuditData(
                        'getMixedRisingElapseTimeGaps', '12/1', i + '/' + (j * 10), order, config
                    ));
                }
            }
        });
        
        // sort data by score
        table.sort(5 + this.drawSize);
        
        return table;
    },
    
    restore: function (game, rows) {
        var table;
        
        this.setGame(game);
        table = new AuditTable('Audit Winners', this.drawSize);
        
        _.each(rows, function (row) {
            table.addRow(row);
        });
        
        return table;
    },
    
    setGame: function (game) {
        this.game = game;
        this.numbers = game.get('numbers');
        this.drawSize = game.get('drawSize');
        this.drawsPerWeek = game.get('drawsPerWeek');
        this.draws = game.getAllDraws();
    },
    
    getAuditData: function (algorithm, periodCount, drawsPerPeriod, order, suggestionsConfig) {
        var currentIteration = 1, lastDraw, suggestion, auditData;
        
        auditData = new AuditData(
            new Date(),
            this.drawSize,
            algorithm,
            periodCount,
            drawsPerPeriod,
            order,
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
    
    getOrderString: function (orders) {
        return orders[0] + '/' + orders[1];
    }
};
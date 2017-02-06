function AuditTable(name, drawSize) {
    var numberCount = 0;

    this.name = name;
    this.rows = [];
    this.drawSize = drawSize;
    this.sortBy = 'getScore';
    
    // build labels
    this.labels = [];
    
    this.addLabel('Date');
    this.addLabel('Algorithm');
    this.addLabel('Period count');
    this.addLabel('Draws per period');
    this.addLabel('Options');
    
    while (numberCount <= this.drawSize) {
        this.addLabel('Hit ' + numberCount);
        numberCount++;
    }
    
    this.addLabel('Score');
    this.addLabel('Total hit %');
}

AuditTable.prototype = {
    constructor: AuditTable,
    
    getName: function () {
        return this.name;
    },
    
    getLabels: function () {
        return this.labels;
    },
    
    getRows: function () {
        return this.rows;
    },
    
    getRowsData: function () {
        var data = [];
        
        _.each(this.rows, function (auditData) {
            var rowData = [];
            
            rowData.push(auditData.getDate().toISOString().slice(0,10));
            rowData.push(auditData.getAlgorithm());
            rowData.push(auditData.getPeriodCount());
            rowData.push(auditData.getDrawsPerPeriod());
            rowData.push(auditData.getOptions());
            
            _.each(auditData.getNumbersHit(), function (hits) {
                rowData.push(hits);
            });
            
            rowData.push(auditData.getScore());
            rowData.push(auditData.getTotalHitPercentage());
            
            data.push(rowData);
        });
        
        return data;
    },
    
    getWinner: function () {
        var winner = undefined, self = this;
        
        _.each(this.rows, function (auditData) {
            if (typeof winner == 'undefined') {
                winner = auditData;
            }
            if (auditData[self.sortBy]() >= winner[self.sortBy]()) {
                winner = auditData;
            }
        });
        
        return winner;
    },
    
    addLabel: function (label) {
        this.labels.push(label);
    },
    
    addRow: function (auditData) {
        this.rows.push(auditData);
    },

    addRows: function (rows) {
        var self = this;

        _.each(rows, function (auditData) {
            self.addRow(auditData);
        });
    },
    
    sort: function () {
        var self = this;

        this.rows.sort(function (a, b) {
            return a[self.sortBy]() - b[self.sortBy]();
        });
        
        this.rows.reverse();
    }
};
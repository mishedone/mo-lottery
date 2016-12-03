function AuditTable(name) {
    this.name = name;
    this.labels = [];
    this.rows = [];
    this.index = 0;
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
    
    addLabel: function (label) {
        this.labels.push(label);
    },
    
    addData: function (data) {
        this.getRow(this.index).push(data);
    },
    
    getRow: function (index) {
        if (typeof this.rows[index] == 'undefined') {
            this.rows[index] = [];
        }
        
        return this.rows[index];
    },
    
    endRow: function () {
        this.index++;
    },
    
    sort: function (column) {
        var index = column - 1;
        
        this.rows.sort(function (a, b) {
            return a[index] - b[index];
        });
        this.rows.reverse();
    }
}
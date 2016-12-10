function AuditTable(name) {
    this.name = name;
    this.labels = [];
    this.rows = [];
    this.index = -1;
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
        this.rows[this.index].addData(data);
    },
    
    startRow: function (config) {
        this.rows.push(new AuditTableRow(config));
        this.index++;
    },
    
    sort: function (column) {
        var index = column - 1;
        
        this.rows.sort(function (a, b) {
            return a.getData(index) - b.getData(index);
        });
        
        this.rows.reverse();
    }
}
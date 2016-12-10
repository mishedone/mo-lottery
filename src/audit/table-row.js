function AuditTableRow(config) {
    this.data = [];
    this.config = config;
}

AuditTableRow.prototype = {
    constructor: AuditTableRow,
    
    getData: function (index) {
        if (typeof index == 'undefined') {
            return this.data;
        }
        
        return this.data[index];
    },
    
    getConfig: function () {
        return this.config;
    },
    
    addData: function (data) {
        this.data.push(data);
    }
}
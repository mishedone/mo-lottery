function BasicStorage() {}

BasicStorage.prototype = {
    constructor: BasicStorage,

    loadData: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    
    saveData: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
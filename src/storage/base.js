function BaseStorage() {}

BaseStorage.prototype = {
    constructor: BaseStorage,

    loadData: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    
    saveData: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
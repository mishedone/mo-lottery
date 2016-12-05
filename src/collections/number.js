function NumberCollection() {
    this.numbers = [];
    this.indexes = {};
}

NumberCollection.prototype = {
    constructor: NumberCollection,

    get: function (number) {
        if (typeof number == 'undefined') {
            return this.numbers;
        } else {
            return this.numbers[this.indexes[number]];
        }
    },

    add: function (number, data) {
        this.numbers.push(data);
        this.indexes[number] = this.numbers.length - 1;
    },

    extract: function () {
        return this.numbers.slice();
    }
};
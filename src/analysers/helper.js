function extractNumbers(objects) {
    var numbers = [];

    _.each(objects, function (object) {
        numbers.push(object.getNumber());
    });

    return numbers;
}
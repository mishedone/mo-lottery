function generateNumbers(start, stop) {
    var numbers = [], iterator;

    // build available number set
    for (iterator = start; iterator <= stop; iterator++) {
        numbers.push(iterator);
    }

    return numbers;
}
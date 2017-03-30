function missingNumbers(input) {
    var missing = [];
    for (var i = 1; i < input.length; i++) {
        var diff = input[i] - input[i - 1];
        if (diff > 1) {
            for (var j = 1; j < diff; j++) {
                missing.push(input[i-1] + j);
            }
        }
    }
    return missing;
}

console.log(missingNumbers([-3, -2, 1, 5]));
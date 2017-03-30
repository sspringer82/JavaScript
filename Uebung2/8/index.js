function nLongest(input, n) {
    var sortedInput = input.sort(function (a, b) {
        if (a.length < b.length) {
            return 1;
        } else if (a.length > b.length) {
            return -1;
        }
        return 0;
    });
    var result = sortedInput[n - 1];
    if (!result) {
        return sortedInput.pop();
    }
    return result;
}

var words = [
    'a',
    'bbbb',
    'cc',
    'ddd'
];

console.log('Längstes: ', nLongest(words, 1));
console.log('2 Längstes: ', nLongest(words, 2));
console.log('3 Längstes: ', nLongest(words, 3));
console.log('4 Längstes: ', nLongest(words, 4));
console.log('5 Längstes: ', nLongest(words, 5));
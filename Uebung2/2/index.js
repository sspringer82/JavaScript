function evenWords(input) {

    var cleanedInput = input.replace(/[\.,!_\?]?/g, '');

    var splitInput = cleanedInput.split(' ');

    var result = splitInput.map(function (word) {
        if (word.length % 2 !== 0)  {
            return word + word.substr(-1);
        }
        return word;
    });

    return result.join(' ');
}

console.log(evenWords('How did we end up here? We go?'));
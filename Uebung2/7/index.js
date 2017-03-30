function nextVersion(version) {
    var result = [];
    version.split('.')
        .reverse()
        .reduce(function (prev, cur) {
            cur = parseInt(cur);
            if (prev === null || prev === 0) {
                cur = (cur === 9) ? 0 : cur + 1;
            }
            result.push(cur);
            return cur;
        }, null);

    return result.reverse()
        .join('.');
}

console.log(nextVersion('1.2.3'));
console.log(nextVersion('0.9.9'));
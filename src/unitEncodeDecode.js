
export default {encode, decode}


function encode(tileId, iconId, creatures) {

    /**!/
    const u0 = encodeUnit(6000, 109, ["a", "a", "b", "b", "c"]);
    const u1 = encodeUnit(1, 511, ["a", "a", "b", "b", "c"]);

    // u0 [ 106000, 1109, 608537233 ] 
    // u1 [ 100001, 1511, 608537233 ] 

    /**/

    const tileInt = 100000 + Number(tileId);
    const iconInt = 1000 + Number(iconId);
    const dict = {};
    creatures.forEach(char => {
        dict[char] = dict[char] || 0;
        dict[char] += 1;
    });
    const summary = Object.keys(dict)
        .map(key => `${key}${dict[key]}`)
        .join("");

    return [
        tileInt,
        iconInt,
        parseInt(summary, 36)
    ];

}


function decode(array) {
    let [tileInt, iconInt, unitInt] = array;

    tileInt -= 100000;
    iconInt -= 1000;
    unitInt = unitInt.toString(36)

    let unitArray = unitInt
        .split(/(?=[a-z][0-9])/)
        .map(pair => {
            let [char, count] = pair.split("");
            return [...Array(Number(count))].map(() => char); //?
        });

    return [tileInt, iconInt, [].concat.apply([], unitArray)];
}


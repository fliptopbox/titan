let accumulate = 0;

const metadata = createMetaData();
const board = createBoard(metadata);

board.map(item => {
    const { id, terrain, index, radius, latitude, rotation } = item;
    return `${id} ${terrain.toUpperCase()} (${index}) [${radius}:${rotation}:${latitude}]`;
}); //?

function dice(n = 1) {
    return [...Array(n)].map((_, i) => (((Math.random() * 60) % 6) + 1) >> 0);
}

function createBoard(metadata) {
    //
    return [].concat
        .apply(
            [],
            metadata.map(item => {
                return [].concat.apply(
                    [],
                    item.map((thing, n) => {
                        return [].concat.apply(
                            [],
                            thing.names.map((tile, i) => {
                                return {
                                    index: thing.indexes[i], // Integer
                                    id: String(thing.labels[i]), // String
                                    moves: thing.moves[i],
                                    // label: thing.labels[i],
                                    terrain: tile,
                                    radius: thing.radius,
                                    latitude: i,
                                    rotation: thing.section
                                };
                            })
                        );
                    })
                );
            })
        )
        .sort((a, b) => a.index - b.index);
}

function createMetaData() {
    const segments = [0, 1, 2, 3, 4, 5];
    return segments.map(segment);
}

function segment(i) {
    const levels = [0, 1, 2, 3];
    let previous = 0;
    return levels.map(level => {
        const radius = level + 1;
        const hexes = level * 2 + 1;
        const section = (i % 6) + 1;
        const even = section % 2 === 0;
        const cardinal = level % 2 === 0 ? 1000 / (level * hexes || 1) : 1;
        const type = String(cardinal).length - 1; // inner, tower, terrain

        const meta = {
            section, // angle of rotation (30 degree shift CCW)
            radius, // distance from center
            hexes, // cells per level in the segement
            total: hexes * 6, // total number of cells in level
            cardinal, // mountain OR tower
            previous, // previous hexcount
            type,
            even
        };
        previous = hexes * 6;
        return getHexSiblings(meta);
    });
}

function getHexSiblings(meta) {
    // returns Object(s) of hexs at the radius

    let { radius, cardinal, even, section, total, previous } = meta;
    let terrains;
    // let level = 0;
    let start = 0;
    let shuffle = 0;
    let indexes = [];

    switch (radius) {
        case 1:
            start = null;
            shuffle = null;
            level = 6;
            terrains = !even ? ["mountains"] : ["tundra"];
            break;

        case 2:
            start = 1;
            shuffle = 4;
            level = 6;
            terrains = !even ? ["swamp", "plains", "woods"] : ["desert", "marsh", "hills"];
            break;

        case 3:
            level = 24;
            start = null;
            shuffle = 0;
            terrains = !even
                ? ["jungle", "marsh", "tower", "brush", "hills"]
                : ["jungle", "plains", "tower", "brush", "woods"];
            break;

        case 4:
        default:
            level = 54;
            start = 101;
            shuffle = 0;
            terrains = !even
                ? ["marsh", "brush", "swamp", "plains", "brush", "marsh", "jungle"]
                : ["plains", "brush", "jungle", "marsh", "brush", "plains", "desert"];

            break;
    }

    const prev = [0, 6, 24, 54];
    indexes = terrains.map((_, i) => {
        return i + (prev[radius - 1] + terrains.length * (section - 1));
    });

    const labels = getTileId(terrains.length, section, start, shuffle, cardinal);
    const moves = getMoveOptions(radius, section);

    return {
        radius,
        section,
        previous,
        total,
        names: terrains,
        labels,
        moves,
        indexes
    };
}

const tiles = [...board]; //?

function getTileById(id, collection) {
    return collection.filter(tile => {
        return tile.id === id;
    })[0];
}

function getTileByIndex(index, collection) {
    return collection.filter(tile => tile.index === index)[0]; //?
}

function getNextTiles(id, collection) {
    const { index, moves } = getTileById(id, collection); //?
    const values = moves.map(array => {
        return array.map(obj => {
            return obj(index);
        });
    });
    const [first, next] = values;
    return { first, next, index };
}

const d = dice(); //?

getDestinationId("600", 1, tiles); //?
getDestinationId("600", 3, tiles); //?
getDestinationId("600", 6, tiles); //?
// getDestinationId("3", 3, tiles); //?

function getDestinationId(fromId, diceRoll, collection, depth = 0, dest = [], previousId = null) {
    // clamp the dice value
    diceRoll = Math.max(diceRoll, 1);
    diceRoll = ((diceRoll - 1) % 6) + 1;

    // prevent revese movements, back to initial tile
    previousId = previousId || fromId;

    if (depth < diceRoll) {
        const method = depth === 0 ? "first" : "next";

        getNextTiles(fromId, collection)
            [method].map(index => getTileByIndex(index, collection))
            .filter(item => item.id !== previousId)
            .forEach(tile => getDestinationId(tile.id, diceRoll, collection, depth + 1, dest, fromId));

        return dest;
    }

    dest.push(fromId);
    return dest;
}

// getNextTiles("140", tiles); //?
// getNextTiles("141", tiles); //?
// getNextTiles("142", tiles); //?
// getNextTiles("101", tiles); //?
// getNextTiles("102", tiles); //?
// getNextTiles("103", tiles); //?
// getNextTiles("104", tiles); //?

// getNextTiles("40", tiles); //?
// getNextTiles("41", tiles); //?
// getNextTiles("100", tiles); //?
// getNextTiles("3", tiles); //?
// getNextTiles("4", tiles); //?

// getNextTiles("42", tiles); //?
// getNextTiles("1", tiles); //?
// getNextTiles("2", tiles); //?

// getNextTiles("1000", tiles); //?
// getNextTiles("2000", tiles); //?
// getNextTiles("3000", tiles); //?
// getNextTiles("4000", tiles); //?
// getNextTiles("5000", tiles); //?
// getNextTiles("6000", tiles); //?

function getMoveOptions(radius, segment) {
    // there are two rules
    // 1. the obligation (aka first movement)
    // 2. the consecutive move (aka second ... Nth)

    const relative = (hexes, diff, amount) => {
        const level = hexes * 6;

        // return (((segment - 1) * hexes + amount + level) % level) + diff;
        return (((segment - 1) * hexes + amount + level) % level) + diff;
    };

    let moves = [];
    let level = 0;

    switch (radius) {
        case 1: // mountains
            level = 6;
            hexes = 6;
            moves = [[[() => segment * 3 + 4], [id => ((id - level) % level) + (level - 1), id => (id + 1) % level]]];
            break;

        case 2:
            level = 18;
            moves = [
                // swamp
                [[() => relative(3, 6, -1), () => relative(3, 6, 1)], [() => relative(3, 6, 1)]],
                // plains
                [[() => segment - 1, () => relative(3, 6, 2)], [() => relative(3, 6, 2)]],
                // woods
                [[() => relative(5, 24, 3), () => relative(3, 6, 3)], [() => relative(5, 24, 3)]]
            ];
            break;

        case 3:
            level = 30;
            moves = [
                // jungle
                [[() => relative(7, 54, 1)], [() => relative(5, 24, 1)]],
                // marsh
                [[() => relative(3, 24, 2), () => relative(3, 6, 0)], [() => relative(3, 6, 0)]],
                // tower
                [
                    [, () => relative(5, 24, 1), () => relative(5, 24, 3), () => relative(7, 54, 3)],
                    [, () => relative(5, 24, 1), () => relative(5, 24, 3), () => relative(7, 54, 3)]
                ],
                // brush
                [[() => relative(5, 24, 2), () => relative(5, 24, 4)], [() => relative(5, 24, 4)]],
                // hills
                [[() => relative(7, 54, 5)], [() => relative(5, 24, 5)]]
            ];
            break;

        case 4:
        default:
            moves = [
                // "marsh" [-1]
                [[() => relative(7, 54, -1)], [() => relative(7, 54, -1)]],
                // "brush"
                [[() => relative(5, 24, 0), () => relative(7, 54, 0)], [() => relative(7, 54, 0)]],
                // "swamp"
                [[() => relative(7, 54, 1)], [() => relative(7, 54, 1)]],
                // "plains"
                [[() => relative(5, 24, 2), () => relative(7, 54, 2)], [() => relative(7, 54, 2)]],
                // "brush"
                [[() => relative(7, 54, 3)], [() => relative(7, 54, 3)]],
                // "marsh"
                [[() => relative(5, 24, 4), () => relative(7, 54, 4)], [() => relative(7, 54, 4)]],
                // "jungle"
                [[() => relative(7, 54, 5)], [() => relative(7, 54, 5)]]
            ];
            break;
    }
    return moves;
}

function getTileId(hexes, section, start = 0, shuffle = 0, cardinal = 0, offset = 42) {
    // the hex tiles have a label number
    // the ID is distict from the serial index
    // this is the number that appears on the hex

    const half = (hexes / 2) >> 0;
    const step = (section - 1) * hexes;
    const skip = (section - 1) * shuffle;
    const iscardinal = cardinal && cardinal - 1 ? true : false;

    // cardianls types ALL start at 1
    start = iscardinal ? 0 : start;

    return [...Array(hexes)].map((_, n) => {
        let value = offset - half + step + skip;

        // cardinal type (aka tower) adds 3 hexes
        // to traverse the loop and labels the tile
        // with it's cardianl multiple (eg. 300, 400)

        if (iscardinal) {
            // the middle title is not a sequential value
            if (n === half) {
                accumulate += hexes - 2;
                return cardinal * section;
            }

            if (n === half + 1) accumulate -= 1;
            if (n === 0) accumulate += 1;

            value += accumulate;
        }

        return ((n + value) % offset) + start;
    });
}
/** *!/

getNextTiles("42", tiles); //?
getNextTiles("1", tiles); //?
getNextTiles("2", tiles); //?

getNextTiles("7", tiles); //?
getNextTiles("8", tiles); //?
getNextTiles("9", tiles); //?

getNextTiles("35", tiles); //?
getNextTiles("36", tiles); //?
getNextTiles("37", tiles); //?


/**/

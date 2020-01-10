export { dice };
function dice(n = 1) {
    return [...Array(n)].map((_, i) => (((Math.random() * 60) % 6) + 1) >> 0);
}

export { getNextTiles };
function getNextTiles(id, collection) {
    const { index, moves } = getTileById(id, collection);
    const [first, next] = moves;
    return { first, next, index };
}

export { getTileById };
function getTileById(id, collection) {
    return collection.filter(tile => {
        return String(tile.id) === String(id);
    })[0];
}

export { getTileByIndex };
function getTileByIndex(index, collection) {
    return collection.filter(tile => tile.index === index)[0];
}

export { getDestinationId };
function getDestinationId(fromId, diceRoll, collection, depth = 0, dest = [], previousId = null) {
    // clamp the dice value
    diceRoll = Math.max(diceRoll, 1);
    diceRoll = ((diceRoll - 1) % 6) + 1;

    // prevent revese movements, back to initial tile
    previousId = previousId || fromId;

    if (depth < diceRoll) {
        const method = depth === 0 ? "first" : "next";

        const matched = getNextTiles(fromId, collection)
            [method].map(index => getTileByIndex(index, collection))
            .filter(item => { 
                return previousId && item.id !== previousId;
            });

        matched
            .forEach(tile => {

                const interupt = tile.occupied ? true : false;
                const nextDepth = interupt ? diceRoll : depth + 1;
                // if(interupt) {
                //     console.warn("!!!!!!! INTERUPT ", tile.id, tile.occupied)
                // }
                return getDestinationId(tile.id, diceRoll, collection, nextDepth, dest, fromId)
            });

        return dest;
    }

    dest.push(fromId);
    return dest;
}

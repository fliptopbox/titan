import data from "../json/titan-board.json";

class Board {
    constructor(legions) {
        this.board = data;
        this.occupied = {};
        this.legions = legions;
    }

    getTileById(id) {
        // returns tile Object, with neighbour tile indexes
        return this.board.filter(tile => {
            return String(tile.id) === String(id);
        })[0];
    }

    getTileByIndex(index) {
        // returns tile Object
        return this.board.filter(tile => tile.index === index)[0];
    }

    getNextTiles(id) {
        // const collection = this.board;
        const { index, moves } = this.getTileById(id);
        const [first, next] = moves;
        return { first, next, index };
    }

    getDestinationId(fromId, diceRoll, depth = 0, dest = [], previousId = null, hist = []) {
        // clamp the dice value
        diceRoll = Math.max(diceRoll, 1);
        diceRoll = ((diceRoll - 1) % 6) + 1;

        // prevent revese movements, backtrack to previous tile
        previousId = previousId || fromId;


        if (depth < diceRoll) {

            const method = depth === 0 ? "first" : "next";
            const matched = this.getNextTiles(fromId)[method]
                .map(index => this.getTileByIndex(index))
                .filter(item => {
                    return previousId && item.id !== previousId;
                });

            matched.forEach(tile => {
                const occupied = this.occupied[tile.id];
                const interupt = occupied || null;
                const nextDepth = interupt ? diceRoll : depth + 1;

                hist.push({id: tile.id, depth, interupt});
                // return this.getDestinationId(tile.id, depth, nextDepth, dest, fromId, hist);
                return this.getDestinationId(tile.id, diceRoll, depth + 1, dest, fromId, hist);
            });

            return [dest, hist];
        }

        dest.push(fromId);
        return [dest, hist];
    }

    updateLegions() {
        this.occupied = {};
        const locations = this.legions.getLocations();
        locations.forEach(legion => {
            this.occupied[legion.location] = legion;
        })
    }

    moveLegion(icon, dice, index = null) {
        this.updateLegions();
        const legion = this.legions.getLegion(icon);
        const [tower, location] = legion;

        const destinations = this.getDestinationId(location, dice);
        console.log(">>>ICON[%s]", icon, destinations);

        if(index === null) return destinations[0];

    }
}

export default Board;

/*
const board = new Board();
board.getDestinationId("1000", 3); //?

26 (3)
1 25,6,7
2 27,28,29
3 57,56,55

25 (3)
1 6,7,8
2 26,27,28
3 26,57,56





*/

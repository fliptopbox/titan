import board from "../json/titan-board.json";
import { dice, getDestinationId, getTileById, getTileByIndex } from "./utilites";

// console.log(JSON.stringify(board,null, 4))
// const d = dice(); //?

const units = [
    {
        id: "600",
        player: 200
    },
    {
        id: "36",
        player: 200
    },
    {
        id: "38",
        player: 100
    }
];

// flag enimy occupation
const territories = flagOpponents(200, board, units);

getDestinationId("600", 3, territories)
    .map(id => getTileById(id, territories))
    .forEach((tile, i) => {
        console.warn(tile.occupied ? "attack": "move", tile.id);

    }); //?

// getDestinationId("600", 3, board); //?
// getDestinationId("600", 6, board); //?

function flagOpponents(tower, board, opponents = []) {
    const shallow = [...board];

    opponents
        .filter(item => item.player !== tower)
        .forEach(item => {
            const { index } = getTileById(item.id, board);
            shallow[index].occupied = item;
            shallow[index];
        });

    return shallow;
}

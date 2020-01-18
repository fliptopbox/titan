import db from "./db";
import Creatures from "./Creatures";
import Legions from "./Legion";
import Board from "./Board";

const game = db.games["aaa"];
const creatures = new Creatures(game);
const legions = new Legions(game);
const board = new Board(legions);

// creatures.import(deceased, legions); //?

creatures.creature("centaur").total; //?
creatures.creature("ogre").total; //?

// legions.legions; //? $.length

legions.splitLegion(102, 304, [3, 2]);

legions.getLegion(102); //? $
legions.getLegion(106); //? $


board.moveLegion(102, 4, null);
board.moveLegion(106, 4, null);

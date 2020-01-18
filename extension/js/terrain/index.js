import jungle from "./jungle.js";
import brush from "./brush.js";
import desert from "./desert.js";
import plains from "./plains.js";
import tower from "./tower.js";
import marsh from "./marsh.js";
import hills from "./hills.js";
import mountains from "./mountains.js";
import swamp from "./swamp.js";
import tundra from "./tundra.js";

const terrains = [
  {
    code: "P",
    name: "Plains",
    battlemap: plains
  },
  {
    code: "U",
    name: "Tundra",
    battlemap: tundra
  },
    {
    code: "W",
    name: "Woods",
    battlemap: tundra
  },
  {
    code: "t",
    name: "Tower",
    battlemap: tower
  },
  {
    code: "S",
    name: "Swamp",
    battlemap: swamp
  },
  {
    code: "m",
    name: "Mountains",
    battlemap: mountains
  },
  {
    code: "H",
    name: "Hills",
    battlemap: hills
  },

  {
    code: "D",
    name: "Desert",
    battlemap: desert
  },
  {
    code: "B",
    name: "Brush",
    battlemap: brush
  },
  {
    code: "J",
    name: "Jungle",
    battlemap: jungle
  },
  {
    code: "M",
    name: "Marsh",
    battlemap: marsh
  }
];

function fromCode(code) {
  const terrain = terrains.filter(item => item.code === code);
  return { ...terrain[0] };
}

function fromName(name) {
  const re = new RegExp(`${name}`, "i");
  const terrain = terrains.filter(item => re.test(item.name));
  return { ...terrain[0] };
}

export default { fromCode, fromName };

/*
Brush
Woods
Marsh
Plains
Desert
Tower
Tundra
Jungle
Hills
Swamp
Mountains


*/

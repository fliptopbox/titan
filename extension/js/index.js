import getStaticHtml from "./getStaticHtml";
import parseTableData from "./parseTableData";
import terrains from "./terrain/";
import hexagon from "./hexagon";

import "./styles.css";

document.getElementById("app").innerHTML = getStaticHtml();

init();

function init() {
  const ascii = document.querySelector("pre");
  const tiles = document.createElement("div");

  ascii.style.position = "relative";
  tiles.classList.add("tiles", true);
  tiles.innerHTML = "xxx";
  ascii.append(tiles);

  var tbl = findTables();
  var players = [
    parseTableData(tbl[0]), // attacker
    parseTableData(tbl[1]) // defender
  ];
  var collection = [].concat.apply([], players.map(player => player.creatures));

  // Merge the terrain data and player occupation
  const { code } = getBattleMetadata();
  const battleMap = Object.assign({}, terrains.fromCode(code).battlemap);

  Object.keys(battleMap).forEach(key => {
    const value = battleMap[key] || "none";
    battleMap[key] = {
      hazard: value,
      location: key
    };
  });

  collection.forEach(row => {
    const { location } = row;
    const { hazard } = battleMap[location];
    battleMap[location] = {
      hazard,
      ...row
    };
  });

  Object.values(battleMap).forEach(tile => {
    const { location, color, hazard, creature, damage } = tile;
    hexagon(location, color, hazard, creature, damage, tiles);
  });
}

// To render the correct BattleLand terrain we need
// to extract the terrain code from the H4 heading

function getBattleMetadata() {
  const h4 = document.querySelectorAll(".unformatted h4[align=center]");
  let [_, code, number] = h4[0].innerText.match(/:\s(\w{1})(\d*)$/);
  const status = h4[1].innerText.match(/:\s?(\d+),\s(.*)$/);
  const round = status[1].trim();
  const description = status[2].trim();
  // const terrain = terrains.fromCode( code ).battlemap;

  return { code, number, round, description };
}

// <div class="unit-percent" style="width:${health}%"></div>

function findTables(classname = "headercenter") {
  var headercenter = document.getElementsByClassName(classname);
  var players = [];
  for (var i = 0; i < headercenter.length; i++) {
    if (/(attacker|defender)/i.test(headercenter[i].innerText)) {
      players.push(headercenter[i].parentNode.parentNode);
    }
  }
  return players;
}

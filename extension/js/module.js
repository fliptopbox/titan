console.log("content >> module.js");

/* 
    the content script
    renders DOMElements and intercepts user Events
    these function must NOT add any content. Just output.

    the key & data are delivered by the background page
    and the transport is "tabsSendMessage.js"

*/

// const body = document.querySelector('body');
// import getStaticHtml from "./getStaticHtml.js";
// import parseTableData from "./parseTableData.js";
// import terrains from "./terrain/index.js";
import hexagon from "./hexagon.js";
import ascii from "./ascii.js";

// import "./styles.css";

// document.getElementById("app").innerHTML = getStaticHtml();

init();

function init() {
    const pre = document.querySelector("pre");
    const tiles = document.createElement("div");
    const heading = document.createElement("div");
    const attack = document.createElement("div");
    const defend = document.createElement("div");

    pre.style.position = "relative";
    attack.classList.add("attack");
    defend.classList.add("defend");
    heading.classList.add("heading");
    
    tiles.classList.add("tiles");
    tiles.append(heading);
    tiles.append(attack);
    tiles.append(defend);

    pre.append(tiles);


    //   var tbl = findTables();
    //   var players = [
    //     parseTableData(tbl[0]), // attacker
    //     parseTableData(tbl[1]) // defender
    //   ];
    //   var collection = [].concat.apply([], players.map(player => player.creatures));

    // Merge the terrain data and player occupation
    //   const { code } = getBattleMetadata();

    //   const battleMap = Object.assign({}, terrains.fromCode(name).battlemap);

    // Object.keys(battleMap).forEach(key => {
    //     const value = battleMap[key] || "none";
    //     battleMap[key] = {
    //         hazard: value,
    //         latlong: key
    //     };
    // });

    // collection.forEach(row => {
    //     const { latlong } = row;
    //     if (!latlong) return;
    //     const { hazard } = battleMap[latlong];
    //     battleMap[latlong] = {
    //         hazard,
    //         ...row
    //     };
    // });

    const battleMap = ascii(pre.innerText);
    console.log(battleMap)

    heading.innerHTML = `<strong>${battleMap.terrain}</strong>`;
    tiles.classList.add(battleMap.terrain.toLowerCase());

    Object.values(battleMap.hexmap).forEach(tile => {
        console.log(tile)
        const { latlong, color, hazard, creature, damage } = tile;
        hexagon(latlong, color, hazard, creature, damage, tiles);
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

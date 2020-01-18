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
import parseTableData from "./parseTableData.js";
// import terrains from "./terrain/index.js";
import hexagon from "./hexagon.js";
import ascii from "./ascii.js";

// import "./styles.css";

// document.getElementById("app").innerHTML = getStaticHtml();

init();

function init() {
    // Only execute of specific pages
    // (blacklist)
    if (/game.asp$/i.test(window.location.href)) {
        console.log("Ignore:", window.location.href);
        return;
    }
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


    const stateData = {
        ...findTables(),
        ...getBattleMetadata()
    }

    console.log(stateData);

    const battleMap = ascii(pre.innerText);
    console.log(battleMap);

    heading.innerHTML = `<strong>${battleMap.terrain}</strong>`;

    // Namespace for CSS .none styling
    tiles.classList.add(battleMap.terrain.toLowerCase());

    Object.values(battleMap.hexmap).forEach(tile => {
        const { latlong, color, hazard, creature, damage } = tile;
        hexagon(latlong, color, hazard, creature, damage, tiles, stateData);
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
    var tables = [];
    for (var i = 0; i < headercenter.length; i++) {
        if (/(attacker|defender)/i.test(headercenter[i].innerText)) {
            tables.push(headercenter[i].parentNode.parentNode);
        }
    }
    const state = {};
    const players = tables.map(parseTableData);
    players.forEach(table => {
        const player = /^attack/i.test(table.header) ? "attacker" : "defender";
        let { color, icon, pointValue, creatures } = table;
        state[player] = { color, icon, pointValue };
        state.creatures = state.creatures || [];
        creatures = creatures.map(item => ({...item, player}))
        state.creatures.push(...creatures);
    });

    return state;
}

async function postToServer(action, data) {
    const { origin, pathname } = window.location;
    const root = pathname.replace(/[^\/]+$i/, "");
    fetch(`${origin}${root}/${action}`, { credentials: "same-origin" })
        .then(response => response.text())
        .then(result => {
            console.log("Success:", result);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

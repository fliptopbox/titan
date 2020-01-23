console.log('content >> module.js');

/* 
    the content script
    renders DOMElements and intercepts user Events
    these function must NOT add any content. Just output.

    the key & data are delivered by the background page
    and the transport is "tabsSendMessage.js"

*/

// const body = document.querySelector('body');
// import getStaticHtml from "./getStaticHtml.js";
// import terrains from "./terrain/index.js";
// import "./styles.css";

import parseTableData from './parseTableData.js';
import getBattleMetadata from './battleMetadata.js';
import hexagon from './hexagon.js';
import ascii from './ascii.js';

init();

function init() {
    // Only execute on specific pages
    // (blacklist)
    const blacklist = ['game.asp', 'guest.asp', 'viewlegion.asp'].join('|');
    const excl = new RegExp(`\/(${blacklist})`, 'i');
    if (excl.test(window.location.href)) {
        console.log('Ignore:', window.location.href);
        return;
    }
    const pre = document.querySelector('pre');
    const tiles = document.createElement('div');
    const heading = document.createElement('div');
    const attack = document.createElement('div');
    const defend = document.createElement('div');

    pre.style.position = 'relative';
    attack.classList.add('attack');
    defend.classList.add('defend');
    heading.classList.add('heading');

    tiles.classList.add('tiles');
    tiles.append(heading);
    tiles.append(attack);
    tiles.append(defend);

    pre.append(tiles);

    const stateData = { ...findTables(), ...getBattleMetadata() };
    console.log(stateData);

    const battleMap = ascii(pre.innerText);
    console.log(battleMap);

    heading.innerHTML = `<strong>${battleMap.terrain}</strong>`;

    // Namespace for CSS .none styling
    tiles.classList.add(battleMap.terrain.toLowerCase());


    Object.values(battleMap.hexmap).forEach(tile => {
        hexagon(tile, tiles, stateData);
    });
}

function findTables(classname = 'headercenter') {
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
        const player = /^attack/i.test(table.header) ? 'attacker' : 'defender';
        let { color, icon, pointValue, creatures } = table;
        state[player] = { color, icon, pointValue };
        state.creatures = state.creatures || [];
        creatures = creatures.map(item => ({ ...item, player }));
        state.creatures.push(...creatures);
    });

    return state;
}

async function postToServer(action, data) {
    const { origin, pathname } = window.location;
    const root = pathname.replace(/[^\/]+$i/, '');
    fetch(`${origin}${root}/${action}`, { credentials: 'same-origin' })
        .then(response => response.text())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

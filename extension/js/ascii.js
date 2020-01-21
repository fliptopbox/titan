import terrains from './terrain/index.js';
/* *!/

import textmap from "./ascii-test-maps.js";
const txt = textmap(1);
parseAsciiMap(txt); //?

/**/

export default parseAsciiMap;
function parseAsciiMap(innertext) {
    const terrain = innertext.match(/\s[A-Z]+\s/)[0].trim();
    let hexmap = hexMapCoordArray().map(id => getHexCell(id, innertext));

    // with the hexmap merge additional terrain metadata
    // stuff like elevation, hazards, natives
    const terrainSchema = terrains.fromName(terrain);
    console.log(terrain, hexmap, terrainSchema);

    hexmap = hexmap.map(row => {
        const { id } = row;
        const { natives = null, hazards = null, battlemap } = terrainSchema;
        const battlemapValue = battlemap[id];
        const terrainType =
            battlemapValue === null ? null : battlemapValue;

        delete row.blank;
        delete row.hazard;

        // merge the terrain schema info
        row.terrain = terrainType;
        row.natives = natives;
        row.hazards = hazards || null;

        return { ...row };
    });

    return {
        terrain: String(terrain).trim(),
        attack: getOpponent('Attack', innertext),
        defend: getOpponent('Defend', innertext),
        hexmap
    };
}

function getOpponent(role, txt, width = 80, height = 38, chars = 10) {
    const re = new RegExp(`(${role})`);
    const { index } = txt.match(re) || {};
    const color = txt.substr(index - width - 1, chars).trim();
    const corners = [null, 'nw', 'ne', 'e', 'se', 'sw', 'w'];

    const x = (index % (width + 1)) / width; //?
    const y = index / (height * width); //?
    const probabiliy =
        [
            // NW (1)
            (x - 0.3) ** 2 + (y - 0.3) ** 2 < 0.1, //?
            // NE (2)
            (x - 0.85) ** 2 + (y - 0.15) ** 2 < 0.1, //?
            // E (3)
            (x - 0.85) ** 2 + (y - 0.5) ** 2 < 0.1, //?
            // SE (4)
            (x - 0.85) ** 2 + (y - 0.85) ** 2 < 0.1, //?
            // SW (5)
            (x - 0.15) ** 2 + (y - 0.85) ** 2 < 0.1, //?
            // W (6)
            (x - 0.1) ** 2 + (y - 0.5) ** 2 < 0.1
        ].findIndex(bool => bool) + 1; //?

    probabiliy;
    let orientation = corners[probabiliy];
    orientation;

    return { color, orientation, index };
}

function getHexCell(id, string = '', vert = 80, chars = 7) {
    const re = new RegExp(`\\/(${id || ''})\\s`);
    if (!string) {
        console.log('No string to match [%s]', id);
        return null;
    }
    const cell = string.match(re).index + 1;
    const metadata = [
        id,
        string.substr(cell + (vert + 1) * 1, chars), // terrain
        string.substr(cell + (vert + 1) * 2, chars), // blank
        string.substr(cell + (vert + 1) * 3, chars).split(' ')[0], // color
        string.substr(cell + (vert + 1) * 3, chars).split(' ')[1], // creature
        string.substr(cell + (vert + 1) * 4, chars) // damage
    ].map(item => `${item}`.replace(/[^\w\s\d\-]+/, '').trim() || null);

    let [_, terrain, blank, color, creature, damage] = metadata;

    color = getColorName(color);
    creature = getCreatureName(creature);
    damage = damage ? Number(damage) : 0;

    return {
        id, //
        latlong: id,
        terrain: (terrain || '').toLowerCase(),
        // hazard: (terrain || '').toLowerCase(),
        blank,
        color,
        creature,
        damage
    };
}

function getColorName(abrv) {
    abrv = abrv || null;
    const colors = {
        Bu: 'Blue',
        Br: 'Brown',
        Bk: 'Black',
        Rd: 'Red',
        Gr: 'Green',
        Gd: 'Gold'
    };
    return (colors[abrv] || 'green').toLowerCase();
}

function getCreatureName(abrv) {
    abrv = abrv || null;
    return (
        {
            Ang: 'Angel',
            Arc: 'Archangel',
            Bal: 'Balrog',
            Beh: 'Behemoth',
            Cen: 'Centaur',
            Col: 'Colossus',
            Cyc: 'Cyclops',
            Dra: 'Dragon',
            Ent: 'Ent',
            Gar: 'Gargoyle',
            Gia: 'Giant',
            Gor: 'Gorgon',
            Gri: 'Griffon',
            Gua: 'Guardian',
            Hyd: 'Hydra',
            Lio: 'Lion',
            Min: 'Minotaur',
            Ogr: 'Ogre',
            Ran: 'Ranger',
            Ser: 'Serpent',
            Ttn: 'Titan',
            Tro: 'Troll',
            Uni: 'Unicorn',
            Wbe: 'Warbear',
            Wlo: 'Warlock',
            Wyv: 'Wyvern'
        }[abrv] || abrv
    );
}

function hexMapCoordArray() {
    return [
        'A1',
        'A2',
        'A3',
        'B1',
        'B2',
        'B3',
        'B4',
        'C1',
        'C2',
        'C3',
        'C4',
        'C5',
        'D1',
        'D2',
        'D3',
        'D4',
        'D5',
        'D6',
        'E1',
        'E2',
        'E3',
        'E4',
        'E5',
        'F1',
        'F2',
        'F3',
        'F4'
    ];
}

import jungle from './jungle.js';
import brush from './brush.js';
import desert from './desert.js';
import plains from './plains.js';
import tower from './tower.js';
import marsh from './marsh.js';
import hills from './hills.js';
import mountains from './mountains.js';
import swamp from './swamp.js';
import tundra from './tundra.js';
import woods from './woods.js';


/*

    terrain schema

    code            String          single character
    name            String          varchar
    natives         Array           String of creature_id
    battlemap       Dictionary

    battlemap.key   String          hex coordinate_id
    battlemap.value Number/String   elevation or hazard_id
*/

const terrains = [
    hills,
    tower,
    jungle,
    mountains,
    plains,
    tundra,
    woods,
    swamp,
    desert,
    brush,
    marsh
];

function fromCode(code) {
    code = String(code || "").trim();
    const terrain = terrains.filter(item => item.code === code);
    return { ...terrain[0] };
}

function fromName(name) {
    name = String(name || "").trim();
    const re = new RegExp(`${name}`, 'i');
    const terrain = terrains.filter(item => {
        return re.test(item.name);
    });
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

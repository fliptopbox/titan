import data from "../json/creatures.json";


class Creatures {
    constructor(game = null) {

        const creatures = data;
        // alpha sort, add index & primary key
        Object.keys(creatures)
            .sort()
            .forEach((key, i) => {
                const code = (10+i).toString(36);
                const obj = {
                    index: i,
                    code,
                    key,
                    ...creatures[key]
                }
                creatures[key] = obj;
        });

        this.creatures = creatures; //?

        // restory inventory count for games in progress
        if(game) {
            const {legions, deceased} = game;
            this.import(deceased, legions); //?
        }
    }

    recruit(terrain, legion) {
        const { creatures } = this;
        const natives = Object.keys(creatures)
            .filter(key => {
                const obj = creatures[key];
                return obj.native.indexOf(terrain) + 1;
            })
            .map(key => (creatures[key]));

        const recruits = [];
        natives.forEach(creature => {
            const { key, requires } = creature;
            // In tower any primitive is recruitable
            // muster another of the same OR a primitive
            if (requires.length === 0 || legion[key] && creatures[key].total) {
                recruits.push(key)
                return;
            }

            // upgrade
            requires.forEach(item => {
                let [name, value] = Object.entries(item)[0];
                if(creatures[key].total && legion[name] && legion[name] >= value) {
                    // recuits.push (creature);
                    recruits.push(key)
                }
            });
        });

        return recruits;
    }
    muster (terrain, legion, name) {
        const validate = this.recruit(terrain, legion);
        if(validate.indexOf(name) + 1) {
            legion[name] = legion[name] || 0;
            legion[name] += 1;
            this.decrease(name, 1);
        }
        return {...legion};
    }
    decrease(name, count = 1) {
        this.creatures[name].total -= count; //?
    }

    creature (name) {
        // returns creature Object
        return this.creatures[name];
    }
    import(deceased = [], legions = []) {
        const units = legions.map(legion => legion[3]);
        const total = [].concat([], deceased, units);

        total.forEach(creature => {
            const [name, count] = Object.entries(creature)[0];
            this.decrease(name, count);
        });

        return this;
    }
}

export default Creatures;

/** QUOKKA *!/

import db from "./db";
const game = db.games["aaa"];



const creatures = new Creatures(game);
// creatures.import(deceased, legions); //?

creatures.creature("centaur").total; //?
creatures.creature("ogre").total; //?


const L1 = { centaur: 1 };
const L2 = { ogre: 3 };

creatures.recruit("plains", L1); //?
creatures.muster("plains", L1, "centaur"); //?

creatures.recruit("plains", L1); //?
creatures.muster("plains", L1, "lion"); //?
creatures.muster("plains", L1, "lion"); //?
creatures.muster("plains", L1, "lion"); //?
creatures.muster("plains", L1, "ranger"); //?

creatures.recruit("desert", L1); //?
creatures.muster("desert", L1, "griffon"); //?
creatures.muster("desert", L1, "griffon"); //?

L1;


creatures.creature("ranger").total; //?
creatures.creature("ranger").code; //?
creatures.creature("centaur").total; //?
creatures.creature("ogre").total; //?

creatures.recruit("tower", L2); //?
creatures.muster("tower", L2, "guardian");

creatures.recruit("marsh", L2); //?
creatures.muster("marsh", L2, "troll");

L2

/** */
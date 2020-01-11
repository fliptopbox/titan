import db from "./db";
import Creatures from "./Creatures";

Creatures; //?

class Legions {
    constructor(game) {
        this.towers = [];
        this.legions = [];
        this.users = game.users;

        if (game && game.legions) {
            this.legions = game.legions;
        }
    }

    import(array) {
        array.forEach(legion => {
            const [tower, location, icon, creatures] = legion;
            this.addLegion(tower, location, icon, creatures);
        });
        return this;
    }

    export() {
        // export obfuscated creatures
        return this.legions;
    }

    getLegion(icon) {
        const legion = this.legions.filter(item => item[2] === icon);

        if (!legion || !legion.length) return null;

        legion[0];
        return legion[0];
    }

    collectionToArray(collection) {
        // returns Array eg. {ogre: 2} => ["ogre", "ogre"]
        let shallow = { ...collection };
        let array = Object.keys(shallow).map(key => {
            key;
            shallow[key]; //?

            return [...Array(shallow[key])].map(() => key);
        });
        return [].concat.apply([], array);
    }

    arrayToCollection(array) {
        // returns Object eg. ["ogre", "ogre"] => {ogre: 2}
        const collection = {};
        array.forEach(string => {
            collection[string] = collection[string] || 0;
            collection[string] += 1;
        });
        return collection;
    }

    getUser(tower) {
        return Object.keys(this.users)
            .filter(user => this.users[user].tower === tower)
            .map(key => this.users[key])[0];
    }

    getLegions(tower) {
        return this.legions.filter(item => item[0] === tower);
    }

    listIcons(tower) {
        const user = this.getUser(tower); //?
        let icons = [user.tower];

        if (user.kills.length) {
            user.kills.forEach(userKey => icons.push(this.users[userKey].tower));
        }

        icons = icons.map(towerInt => {
            return [...Array(12)].map((_, i) => towerInt * 100 + i);
        });
        icons = [].concat.apply([], icons);

        const usedIcons = this.getLegions(tower)
            .filter(legion => legion[0] === tower)
            .map(legion => legion[2]);

        return icons.filter(icon => !(usedIcons.indexOf(icon) + 1));
    }

    saveLegion(tower, location, icon, collection) {
        // if the legion exists (aka split) UPDATE the collection
        // otherwise INSERT the new Legion collection
        // returns legion Array

        const legion = [tower, location, icon, collection];
        const index = this.legions.findIndex(item => item[2] === icon);
        if (index + 1) {
            this.legions[index] = legion;
            return legion; //?
        }
        this.legions.push(legion);
        return legion; //?
    }

    splitLegion(currentIcon, nextIcon, indexes = []) {
        let [tower, location, _, originalLegion] = this.getLegion(currentIcon); //?

        let currentLegion = this.collectionToArray(originalLegion);
        let nextLegion = indexes.filter(v => v <= currentLegion.length - 1).map(i => currentLegion[i]); //?

        nextLegion.forEach(name => {
            const i = currentLegion.indexOf(name);
            currentLegion.splice(i, 1);
        });

        // check the requested icon is available
        const availableIcon = this.listIcons((nextIcon / 100) >> 0).some(int => nextIcon === int);

        // a legion requires a minimum population and a unique icon.
        if (!availableIcon || nextLegion.length < 2 || currentLegion.length < 2) {
            return null;
        }

        // convert Array(s) to collection(s) and save the spit
        // using existing tower and location
        this.saveLegion(tower, location, currentIcon, this.arrayToCollection(currentLegion));
        this.saveLegion(tower, location, nextIcon, this.arrayToCollection(nextLegion));

        return nextLegion;
    }
}

export default Legions;

const game = db.games["aaa"];
const creatures = new Creatures(game);
const legions = new Legions(game);

// creatures.import(deceased, legions); //?

creatures.creature("centaur").total; //?
creatures.creature("ogre").total; //?

legions.legions; //? $.length

legions.listIcons(1); //?
legions.splitLegion(102, 304, [3, 2]); //?

legions.legions; //? $.length
legions.legions; //? $

// legions.splitLegion(411); //?

// const collection = [
//     [5, 6000, 509, 608537233],
//     [5, 100, 511, 608537233],
//     [1, 7, 202, 608537233],
//     [1, 14, 206, 608537233]
// ];

// legions.import(collection); //?

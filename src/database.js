import db from "../json/database.json";

const sessions = {};

function sessionCheck(token) {
    if (!sessions[token]) {
        console.error("Invalid tokken", token);
        return null;
    }
    return sessions[token];
}

function userObject(token) {
    return sessionCheck(token);
}

function gameLoad(token, gid) {
    const ssn = sessionCheck(token);
    return ssn ? db.games[gid] : null;
}

function usersOnline() {
    return Object.keys(sessions).map(user => sessions[user].alias);
}

class User {
    constructor(db) {
        this.db = db;
        this.sessions = sessions;
        this.alias = null;
        this.token = null;
    }

    username(username) {
        const { db } = this;
        const { users } = db;

        if (!users[String(username).toLowerCase()]) {
            console.warn("No user [%s]", username);
            return this;
        }

        console.log("Request password");
        this.alias = username;
        return this;
    }

    password(password) {
        const { alias, db } = this;
        const { users } = db;
        const user = users[alias]; //?

        if (!alias) {
            console.error("No username");
            return this;
        }

        if (user.pwd !== password) {
            console.log("Invalid login", alias);
            return this;
        }

        const token = [...Array(32)]
            .map(() => (Math.random() * 100000000) >> 0)
            .map(i => i.toString(32))
            .join("");

        const { name, games } = user;

        this.token = token;
        this.sessions[token] = {
            alias,
            name,
            games
        };

        return this;
    }

    games() {
        const { alias, db } = this;
        const list = db.users[alias].games;
        return list;
    }
}

const kilroy = new User(db, sessions);
const alpha = new User(db, sessions);

kilroy
    .username("kilroy")
    .password("jjk")
    .games(); //?
alpha.username("alpha").password("aa"); //?

alpha.games(); //?

usersOnline(); //?


function encodeUnit(tileId, iconId, creatures) {

    /**!/
    const u0 = encodeUnit(6000, 109, ["a", "a", "b", "b", "c"]);
    const u1 = encodeUnit(1, 511, ["a", "a", "b", "b", "c"]);

    // u0 [ 106000, 1109, 608537233 ] 
    // u1 [ 100001, 1511, 608537233 ] 

    /**/

    const tileInt = 100000 + Number(tileId);
    const iconInt = 1000 + Number(iconId);
    const dict = {};
    creatures.forEach(char => {
        dict[char] = dict[char] || 0;
        dict[char] += 1;
    });
    const summary = Object.keys(dict)
        .map(key => `${key}${dict[key]}`)
        .join("");

    return [
        tileInt,
        iconInt,
        parseInt(summary, 36)
    ];

}

const u0 = encodeUnit(6000, 109, ["a", "a", "b", "b", "c"]);
const u1 = encodeUnit(1, 511, ["a", "a", "b", "b", "c"]);
u0;
u1;
decodeUnit(u0); //?
decodeUnit(u1); //?

function decodeUnit(array) {
    let [tileInt, iconInt, unitInt] = array;

    tileInt -= 100000;
    iconInt -= 1000;
    unitInt = unitInt.toString(36)

    let unitArray = unitInt
        .split(/(?=[a-z][0-9])/)
        .map(pair => {
            let [char, count] = pair.split("");
            return [...Array(Number(count))].map(() => char); //?
        });

    return [tileInt, iconInt, [].concat.apply([], unitArray)];
}

parseInt("a3b2", 36); //?

function creatures() {

    const characters = [
        // char name, count, str, int, skill
        // skill: 0, none, 1 range, 2 fly, 3 both
        ["a", "Angel", 18],
        ["b", "Archangel", 6],
        ["c", "Behemoth", 18],
        ["d", "Centaur", 25],
        ["e", "Coloss", 10],
        ["f", "Cyclop", 28],
        ["g", "Dragon", 18],
        ["h", "Gargoyle", 21],
        ["i", "Giant", 18],
        ["j", "Gorgon", 25],
        ["k", "Griffon", 18],
        ["l", "Guardian", 6],
        ["m", "Hydra", 10],
        ["n", "Lion", 28],
        ["o", "Minotaur", 21],
        ["p", "Ogre", 25],
        ["q", "Ranger", 28],
        ["r", "Serpent", 10],
        ["s", "Titan", 6],
        ["t", "Troll", 28],
        ["u", "Unicorn", 12],
        ["v", "Warbear", 21],
        ["w", "Warlock", 6],
        ["x", "Wyvern", 18],

    ]
}
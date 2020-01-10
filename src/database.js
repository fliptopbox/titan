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

const units = [
    parseInt("6mf2h2w1", 36),
    parseInt("1b3d1", 36)
];
units;

Number(106000).toString(36); //?
Number(100600).toString(36); //?
Number(100060).toString(36); //?
Number(100001).toString(36); //?

decodeUnit(units[0]); //?
decodeUnit(units[1]); //?

function decodeUnit(number) {
    const b36 = Number(number).toString(36);
    const parts = b36.match(/(^[0-9]+[mc]?)([0-9a-w]+$)/);
    let [_, tile, creatures] = parts;

    tile = /[mc]$/.test(tile) ? tile.replace(/m/, "000").replace(/c/, "00") : tile;
    creatures = [].concat.apply([], creatures
        .split(/(?=[a-z][0-9])/)
        .map(u => {
            const char = u.split("");
            return [...Array(Number(char[1]))].map(() => char[0]);
        }));

    tile;
    creatures;

    return b36;
}

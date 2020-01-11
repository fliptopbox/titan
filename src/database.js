import db from "./db";
import User from "./User"
import unit from "./unitEncodeDecode";

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


const kilroy = new User(db, sessions);
const alpha = new User(db, sessions);

kilroy
    .username("kilroy")
    .password("jjk")
    .games();

alpha.username("alpha").password("aa"); //?
alpha.games();

usersOnline();

const u0 = unit.encode(6000, 109, ["a", "a", "b", "b", "c"]);
const u1 = unit.encode(1, 511, ["a", "a", "b", "b", "c"]);


unit.decode(u0);
unit.decode(u1);

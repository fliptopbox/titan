class User {
    constructor(db, sessions) {
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

export default User;
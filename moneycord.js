const { Client, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('./models/user');
const config = require('./config');

// Create Moneycord

class Moneycord extends Client {
    constructor(...options) {
        super(...options);

        // Variables 
        this.config = require('./config');
        this.embed = class embed extends MessageEmbed { constructor(...options) { super(...options)}}

        this.log = async (message) => console.log(`[Moneycord] ${message || "No message"}`);

        // Checking
        if (!this.config) return this.log(`Config file missing.`)

        if (!this.config.token) return this.log(`Token missing, please configure config.js`);
        if (!this.config.prefix) return this.log(`Prefix missing, please configure config.js`);
        if (!this.config.mongo) return this.log(`Mongo Database URI missing, please configure config.js`);
        if (!this.config.activity.name) return this.log(`Activity name missing, please configure config.js`);
        if (!this.config.activity.type) return this.log(`Activity type missing, please configure config.js`);

        this.on('ready', () => {
            this.log(`${this.user.tag} is ready.
Thanks for using Moneycord, contact our Discord for help: https://discord.gg/W88aEhEbbq`);
            this.user.setActivity(this.config.activity.name, { type: this.config.activity.type.toUpperCase()});
        });

        this.createUser = async (id) => {
            return await User.create({ id: id })
        };

        this.getUser = async (id) => {
            let user;
            const FoundUser = await User.findOne({ id: id });
            if (FoundUser) {
                user = FoundUser;
            } else {
                await this.createUser(id).then((NewUser) => user = NewUser);
            };

            return user;
        };

        this.deleteUser = async (id) => {
            return await User.findOneAndDelete({ id: id });
        };

        this.updateCoins = async (id, coins) => {
            return await User.findOneAndUpdate({ id: id }, { $inc: { coins: coins }});
        };
    }

    start() {
        this.login(this.config.token);
    };

    connectMongo() {
        mongoose.connect(this.config.mongo, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(() => this.log(`Connected to Mongo Database.`));
    };
}

// Export Moneycord
module.exports = Moneycord;
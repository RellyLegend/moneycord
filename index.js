const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS]});

const config = require('./config');

const EconomyBot = require('./src/EconomyBot');
const ecoBot = new EconomyBot(config.token);

ecoBot.setDatabase(config.mongo);

client.login(config.token);
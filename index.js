const Moneycord = require('./moneycord');
const { Intents, Collection } = require('discord.js');
const client = new Moneycord({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
]});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach((event) => {
    require(`./events/${event}`)(client);
});

client.on('message', (message) => {
    if (message.author.bot) return; // Making sure not to reply to other bots.
    if (!message.content.startsWith(client.config.prefix)) return; // Making sure the user always mentions the prefix first (set in config.js) before naming a command to execute.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = client.commands.get(args.shift().toLowerCase());

    if (command) command.run(client, message, args);
});

client.connectMongo();
client.start();
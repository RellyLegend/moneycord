module.exports = {
    name: "balance",
    description: "View your/someone's balance.",
    aliases: ['bal'],
    run: async (client, message, args) => {
        const mentioned = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const user = await client.getUser(mentioned.id);

        const balance = new client.embed()
        .setAuthor(mentioned.tag, mentioned.displayAvatarURL())
        .setDescription(`**${mentioned.tag}** has **${user.coins}** coins.`)
        .setColor(client.config.embedColor.toUpperCase())
        .setFooter('© https://github.com/RellyLegend/moneycord');
        message.channel.send(balance);
    }
};
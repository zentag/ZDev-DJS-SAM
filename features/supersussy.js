const Discord = require('discord.js')

module.exports = (client) => {
    client.on("guildCreate", (g) => {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Hi!")
        embed.setDescription("Thanks for adding me to your server! I'm S.A.M, which stands for Stonks Acivity Measure. To set up your guild with the bot, do 'stonks?setup'")
        embed.setColor("0099ff")
        embed.attachFiles('./stonks.jpg')
        embed.setImage('attachment://stonks.jpg');
        let guild = client.guilds.cache.get(g.id)
        let channelID;
        let channels = guild.channels.cache;

        channelLoop:
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }

        let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
        channel.send(embed)
    })
}
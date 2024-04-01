require ('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, Partials } = require('discord.js');
const { runGeminiPro } = require('./gemini');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,],
    partials: [
        Partials.Channel, 
        Partials.Message, 
        Partials.Reaction]
}); 

client.login(process.env.DISCORD_TOKEN);

const authorizedUsers = ['458421510596460554']
const authorizedChannels = ['1222365923411755018']

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate',  async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM && authorizedUsers.includes(message.author.id) ){
        const response = await runGeminiPro(message.content);
        message.reply(response);
    }
    if (message.channel.type === ChannelType.GuildText && authorizedChannels.includes(message.channel.id)){
        if (!message.mentions.has(client.user)){
            return
        }
        const userID = message.author.id;
        message.reply(`HOW ARE YOU DOING, ${userID} how may I help you?`);
    }
})




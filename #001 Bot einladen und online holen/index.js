const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Dein Token hier hin";

bot.on('ready', () =>{
    console.log("Der Bot ist einsatzbereit!")
})

bot.login(token)
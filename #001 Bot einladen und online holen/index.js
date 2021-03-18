const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ODIxNzI4NjM1Njg1NDM3NDQw.YFH8bQ.5QD-GC34MtC23VvfRh8m2MVRWU8";

bot.on('ready', () =>{
    console.log("Der Bot ist einsatzbereit!")
})

bot.login(token)
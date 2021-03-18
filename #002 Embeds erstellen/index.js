const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ODIxNzI4NjM1Njg1NDM3NDQw.YFH8bQ.kGQo9tGSwr4wXS2UbUwwBOk2iXw";

bot.on('ready', () =>{
    console.log("Der Bot ist einsatzbereit!")
})

bot.on('message', message => {
    if(message.author.bot) return;

    if(message.content === "%help"){
        let embed = new Discord.MessageEmbed()
        .setTitle("**Hilfe**")
        .setDescription("Das hier sind die Hilfsbefehle:")
        .addField("%help", "Dieser Befehl zeigt diese Hilfe an", true)
        .addField("Keine Hilfe", "Es gibt zur Zeit keine weitere Hilfe", true)
        .addField("Ich bin der TutorialBot", "Liked mich auf YouTube", false)
        .setFooter(text="Ich bin dein Bot. Beep Bop.")
        .setColor("RANDOM")
        message.channel.send(embed)
    }
})

bot.login(token)
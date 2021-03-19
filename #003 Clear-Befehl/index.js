const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ODIxNzI4NjM1Njg1NDM3NDQw.YFH8bQ.gcn4-NsV4pBU_qryU_Z4MiRyB48";
const prefix = "%";
const fs = require("fs");
const ms = require("ms");

bot.on('ready', () =>{
    console.log("Der Bot ist einsatzbereit!")
})

bot.on('message', message => {
    let args = message.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();

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

    if(message.content.startsWith("%clear")){
        let messages = message.content.split(" ").slice(1).join("");
        message.delete();

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Du hast keine Rechte um Nachrichten zu löschen!").then(msg=>msg.delete({timeout:"5000"}));

        if(isNaN(messages)) message.reply("Du hast keine Anzahl an Nachrichten zum löschen eingegeben!").then(msg=>msg.delete({timeout:"5000"}));

        message.channel.bulkDelete(messages);

        message.channel.send("Ich habe " + messages + " Nachrichten gelöscht!").then(msg=>msg.delete({timeout:"5000"}));
    }
})
bot.login(token)
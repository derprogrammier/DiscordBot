const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "";
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

    if(message.content === "%serverinfo"){
        if(!message.guild) return;

        let server = {
            logo: message.guild.iconURL(),
            name: message.guild.name,
            createdAt: message.guild.createdAt,
            id: message.guild.id,
            owner: message.guild.owner.user.username,
            region: message.guild.region,
            verified: message.guild.verified,
            members: message.guild.memberCount
        }

        let embed = new Discord.MessageEmbed()
        .setTitle("**ServerInfo**")
        .setColor("RANDOM")
        .setThumbnail(server.logo, true)
        .addField("**Name**: ",server.name, true)
        .addField("**Id**: ",server.id, true)
        .addField("**Owner**: ",server.owner, true)
        .addField("**Region**: ",server.region, true)
        .addField("**Verifiziert**: ",server.verified, true)
        .addField("**Mitglieder**: ",server.members, true)
        .addField("**Erstellt am**: ",server.createdAt, true)

        message.channel.send(embed);
    }

    if(message.content.startsWith("%userinfo")){
        let user = message.mentions.users.first() || message.author

        let userinfo = {
            avatar: user.avatarURL(),
            name: user.username,
            discrim: `#${user.discriminator}`,
            id: user.id,
            status: user.presence.status,
            bot: user.bot,
            erstelltAm: user.createdAt
        }

        let embed = new Discord.MessageEmbed()
        .setThumbnail(userinfo.avatar)
        .setColor("RANDOM")
        .addField("Username: ", userinfo.name, true)
        .addField("Discriminator: ", userinfo.discrim, true)
        .addField("Id: ", userinfo.id, true)
        .addField("Status: ", userinfo.status, true)
        .addField("BOT: ", userinfo.bot, true)
        .addField("Created at: ", userinfo.erstelltAm, true)

        message.channel.send(embed);
    }
})
bot.login(token)
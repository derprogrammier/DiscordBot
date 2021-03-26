const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ODIzNDY3NTk1NDI4MTM0OTIy.YFhP9g.-Q3P99rjYVuO0bLEFi2dTVECtZk";
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

    if (message.content.startsWith("%clear")){
        let messages = message.content.split(" ").slice(1).join("");
        message.delete();

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Du hast keine Rechte um diesen Befehl zu benutzen!").then(msg=>msg.delete({timeout:"5000"}))

        if(isNaN(messages)) return message.reply("Du hast keine Anzahl an Nachrichten eingegeben, die du löschen willst").then(msg=>msg.delete({timeout:"5000"}));

        message.channel.bulkDelete(messages);

        message.channel.send("Habe " + messages + " Nachrichten gelöscht.").then(msg=>msg.delete({timeout:"5000"}))
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
        .setTitle("**UserInfo**")
        .setThumbnail(userinfo.avatar)
        .setColor("RANDOM")
        .addField("**Username:**", userinfo.name, true)
        .addField("**Discriminator:**", userinfo.discrim, true)
        .addField("**Id:**", userinfo.id, true)
        .addField("**Status:**", userinfo.status, true)
        .addField("**BOT:**", userinfo.bot, true)
        .addField("**Erstellt am:**", userinfo.erstelltAm, true)

        message.channel.send(embed);
    }
    if(message.content.startsWith("%kick")){
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Du hast keine Rechte um Nutzer zu kicken.");
        let toKick = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send('Bitte gebe jemanden zum kicken an.');
        if(!toKick) return message.channel.send(`${args[0]} ist kein MItglied des Servers.`);
        if(!reason) return message.channel.send('Gebe bitte einen Grund an.');
 
        if(!toKick.kickable){
            return message.channel.send(':x: Ich kann niemanden kicken, der Moderator/Admin ist. :x:');
        }
 
        if(toKick.kickable){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Kick**")
            .addField("Nutzer", toKick, true)
            .addField("Wurde gekickt von", message.author, true)
            .addField("Grund", reason, true)
            .addField("Zeit", message.createdAt, true)
            .setColor("RANDOM");
 
            message.channel.send(embed), message.reply(`Ich habe den Nutzer ${toKick} erfolgreich gekickt.`);
            toKick.kick();
        }
    }
    if(message.content.startsWith("%ban")){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Du hast keine Rechte um Nutzer zu bannen.");
        let toBan = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send('Bitte gebe jemanden zum bannen an');
        if(!toBan) return message.channel.send(`${args[0]} ist kein MItglied des Servers.`);
        if(!reason) return message.channel.send('Gebe bitte einen Grund an.');
 
        if(!toBan.bannable){
            return message.channel.send(':x: Ich kann niemanden kicken, der Moderator/Admin ist. :x:').then(msg=>msg.delete({timeout:"5000"}));
        }
 
        if(toBan.bannable){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Ban**")
            .addField("Nutzer", toBan, true)
            .addField("Gebannt von", message.author, true)
            .addField("Grund", reason, true)
            .addField("Zeit", message.createdAt, true)
            .setColor("RANDOM");
 
            message.channel.send(embed), message.reply(`Ich habe den Nutzer ${toBan} erfolgreich gebannt.`);
            toBan.ban();
        }
    }
})
bot.login(token)
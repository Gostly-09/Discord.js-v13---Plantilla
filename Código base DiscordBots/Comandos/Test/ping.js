const Discord = require('discord.js');

module.exports = {
    name: "ping",
    alias: [],

execute (client, message, args){

    message.reply(`Pong! 🏓\n${client.ws.ping}ms`)

  }

} // Con este comando se enviara la latencia del cliente del bot
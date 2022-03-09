const Discord = require('discord.js'); // Definimos Discord: Necesitas instalar la npm discord.js
const intents = new Discord.Intents(32767) // Definimos intents: Activa los Privileged Gateway Intents en https://discord.com/developers/applications
const client = new Discord.Client({ intents }) // Definimos cliente

client.on('ready', () => { // Evento ready
    console.log('Online!')
}) // Evento ready

const fs = require('fs')  // Definimos fs: Nevesitas instalar la npm fs
client.commands = new Discord.Collection(); // Definimos los comandos del cliente

const commandFolders = fs.readdirSync("./Comandos"); // Command Handler
for(const folder of commandFolders){
    const commandFiles = fs.readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js")) // Necesitamos que exista la carpeta "Comandos" para que funcione
    for(const file of commandFiles){
        const command = require(`./Comandos/${folder}/${file}`); // Dentro de la carpeta de Comandos debe existir otra carpeta y dentro de esa carpeta un archivo con el comando, ese archivo debe finalizar en .js
        client.commands.set(command.name, command) // Seteamos nombre del comando y comando
    }
} // Command Handler

client.on('messageCreate', (message) => { // Evento mensaje

    let prefix = 'tu prefix' // Defines prefix

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return; // Esto nos ayudara para que si el bot no puede enviar mensajes no crashee

	if(message.author.bot) return; // Si el autor del mensaje es un bot no respondera el bot
    if(message.channel.type == "dm") return; // Si el mensaje es al DM no respondera y no va a dar crash
    if(!message.content.toLowerCase().startsWith(prefix)) return; // Si el mensaje no inicia con el prefix no respondera el bot

    const args = message.content.slice(prefix.length).trim().split(/ +/g) // Defines argumentos
    const command = args.shift().toLowerCase(); // Defines comando, esto ayudara a no hacer varios client.on

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command)); // Necesario para el command handler
    if(cmd){
        cmd.execute(client, message, args)
    } // Necesario para el command handler

}) // Evento mensaje

client.login('Token de tu bot') // Hacemos que el bot arranque 
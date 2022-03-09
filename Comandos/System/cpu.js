const Discord = require('discord.js'); // Definimos discord
const { mem, cpu, os } = require('node-os-utils'); // Definimos mem, cpu y os: Necesitas instalar la npm node-os-utils
const { stripIndent } = require('common-tags'); // Definimos stripIndent: Necesitas instalar la npm common-tags

module.exports = {
	name: "cpu",
	alias: [],

async execute (client, message, args){

  const { totalMemMb, usedMemMb } = await mem.info();

    const systeminfo = stripIndent`
        CPU       : ${cpu.model()}
        Cores     : ${cpu.count()}
        CPU Usage : ${await cpu.usage()} %
        RAM       : ${totalMemMb} MB
        RAM Usage : ${usedMemMb} MB
        `;

    message.channel.send({ content: `\`\`\`\n${systeminfo}\`\`\`` })
	
  }
	
} // Con este comando se enviara los recursos que esta usando el bot
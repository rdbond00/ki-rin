const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const discordModals = require('discord-modals')


//Const our function that collects commands and handlers, etc
const collectFiles = require('./functions/collectFiles')

//Global Variables
global.MessageEmbed = MessageEmbed
global.Collection = Collection
global.MessageActionRow = MessageActionRow
global.MessageButton = MessageButton
global.fs = require('fs');
global.io = require('@pm2/io')
global.commandsRun = io.counter({
  name: 'Command requests',
  id: 'app/realtime/requests'
});
global.config = require('./config.json')
global.music = require('@koenie06/discord.js-music');
global.client = new Client({ intents: config.intents ,partials: config.partials});
discordModals(client)

//Read and collect our Basic commands, Slash commands, and handlers
collectFiles.function()

//Initialization processes
client.once('ready', (client.handlers.get('connected')))

//Deal With Errors
client.handlers.get('error')()

//Event handler
client.handlers.get('event')()

//Time to login
client.login(config.token);

process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
  })
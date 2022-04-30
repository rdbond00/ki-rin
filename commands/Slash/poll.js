const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed,MessageActionRow} = require('discord.js')
const pollsdb = require("../../Models/polls")
const moment = require('moment-timezone')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates/Ends a poll in the specified channel'),
	async execute(interaction) {

        if(interaction.options.getSubcommand() === 'start'){
            const poll_Channel = client.channels.cache.get(interaction.options.getChannel(('channel')).id)
            const poll_Title =interaction.options.getString('title')
            const poll_NumOptions = interaction.options.getNumber('number')
            const poll_Choices = interaction.options.getString('choices').split(';')
            const poll_Description = interaction.options.getString('description')
            const poll_timeChoices = []

            const Embed = new MessageEmbed()
            const row1 = new MessageActionRow()
            const row2 = new MessageActionRow()
            const row3 = new MessageActionRow()
            const row4 = new MessageActionRow()
            const row5 = new MessageActionRow()
            
            Embed.setTitle(poll_Title)
    
            if(poll_Description != null){
                Embed.setDescription(poll_Description)   
            }

            for (x = 0; x < poll_Choices.length; x++){

                global.d = new Date(parseInt(poll_Choices[x].toString().slice(3,-3))*1000)
                global.time = moment(d).format('h:mm a').toString()

                if(poll_Choices[x].includes('<t:')&&poll_Choices[x].includes(':t>')){
                    Embed.addField(`${poll_Choices[x]} [Time${x+1}]`,"\u200B",false)
                    poll_timeChoices.push(`${time} [Time${x+1}]`)
                } else {
                    Embed.addField(`${poll_Choices[x]}`,"\u200B",false)
                }


                
                if(x < 5){
                    if(poll_Choices[x].includes('<t:')||poll_Choices[x].includes(':t>')){
                        row1.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(`${time} [Time${x+1}]`)
                            .setStyle('PRIMARY')
                            )
                    } else {
                        row1.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(poll_Choices[x])
                            .setStyle('PRIMARY')
                            )
                    }

                } else if(x >= 5 && x <= 9){
                    if(poll_Choices[x].includes('<t:')||poll_Choices[x].includes(':t>')){
                        row2.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(`${time} [Time${x+1}]`)
                            .setStyle('PRIMARY')
                            )
                    } else {
                    row2.addComponents(
                        new MessageButton()
                        .setCustomId(`button${x}`)
                        .setLabel(poll_Choices[x])
                        .setStyle('PRIMARY')
                        )
                    }
                } else if(x >= 10 && x <= 14){
                    if(poll_Choices[x].includes('<t:')||poll_Choices[x].includes(':t>')){
                        row3.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(`${time} [Time${x+1}]`)
                            .setStyle('PRIMARY')
                            )
                    } else {
                    row3.addComponents(
                        new MessageButton()
                        .setCustomId(`button${x}`)
                        .setLabel(poll_Choices[x])
                        .setStyle('PRIMARY')
                        )
                    }
                } else if(x >= 15 && x <= 19){
                    if(poll_Choices[x].includes('<t:')||poll_Choices[x].includes(':t>')){
                        row4.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(`${time} [Time${x+1}]`)
                            .setStyle('PRIMARY')
                            )
                    } else {
                    row4.addComponents(
                        new MessageButton()
                        .setCustomId(`button${x}`)
                        .setLabel(poll_Choices[x])
                        .setStyle('PRIMARY')
                        )  
                    }             
                } else if(x >= 20 && x <= 24){
                    if(poll_Choices[x].includes('<t:')||poll_Choices[x].includes(':t>')){
                        row5.addComponents(
                            new MessageButton()
                            .setCustomId(`button${x}`)
                            .setLabel(`${time} [Time${x+1}]`)
                            .setStyle('PRIMARY')
                            )
                    } else {
                    row5.addComponents(
                        new MessageButton()
                        .setCustomId(`button${x}`)
                        .setLabel(poll_Choices[x])
                        .setStyle('PRIMARY')
                        )    
                    }  
                }

            }
            
            
            if(poll_Choices.length < 6){
                await poll_Channel.send({embeds: [Embed],components: [row1]}).then(sent => { // 'sent' is that message you just sent
                    pollsdb.findOne({ guildId: config.guildId, pollId: sent.id}, async (err, dbdata) => {
        
                        if(err) throw err;
                
                        if(!dbdata) {
                            if(poll_timeChoices[0] === undefined){
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_Choices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            } else {
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_timeChoices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            }

                        }
                        interaction.reply({ content: `Your poll has been created.`, ephemeral: true })
                        dbdata.save()
        
                    })
                  });
            } else if(poll_Choices.length >= 6 && poll_Choices.length <= 10){
                await poll_Channel.send({embeds: [Embed],components: [row1,row2]}).then(sent => { // 'sent' is that message you just sent
                    pollsdb.findOne({ guildId: config.guildId, pollId: sent.id}, async (err, dbdata) => {
        
                        if(err) throw err;
                
                        if(!dbdata) {
                            if(poll_timeChoices[0] === undefined){
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_Choices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            } else {
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_timeChoices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            }

                        }
                        interaction.reply({ content: `Your poll has been created.`, ephemeral: true })
                        dbdata.save()
        
                    })
                  });
            } else if(poll_Choices.length >= 11 && poll_Choices.length <= 15){
                await poll_Channel.send({embeds: [Embed],components: [row1,row2,row3]}).then(sent => { // 'sent' is that message you just sent
                    pollsdb.findOne({ guildId: config.guildId, pollId: sent.id}, async (err, dbdata) => {
        
                        if(err) throw err;
                
                        if(!dbdata) {
                            if(poll_timeChoices[0] === undefined){
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_Choices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            } else {
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_timeChoices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            }

                        }
                        interaction.reply({ content: `Your poll has been created.`, ephemeral: true })
                        dbdata.save()
        
                    })
                  });
            } else if(poll_Choices.length >= 16 && poll_Choices.length <= 20){
                await poll_Channel.send({embeds: [Embed],components: [row1,row2,row3,row4]}).then(sent => { // 'sent' is that message you just sent
                    pollsdb.findOne({ guildId: config.guildId, pollId: sent.id}, async (err, dbdata) => {
        
                        if(err) throw err;
                
                        if(!dbdata) {
                            if(poll_timeChoices[0] === undefined){
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_Choices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            } else {
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_timeChoices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            }

                        }
                        interaction.reply({ content: `Your poll has been created.`, ephemeral: true })
                        dbdata.save()
        
                    })
                  });
            } else if(poll_Choices.length >= 21 && poll_Choices.length <= 25){
                await poll_Channel.send({embeds: [Embed],components: [row1,row2,row3,row4,row5]}).then(sent => { // 'sent' is that message you just sent
                    pollsdb.findOne({ guildId: config.guildId, pollId: sent.id}, async (err, dbdata) => {
        
                        if(err) throw err;
                
                        if(!dbdata) {
                            if(poll_timeChoices[0] === undefined){
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_Choices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            } else {
                                dbdata = new pollsdb({
                                    guildId: config.guildId,
                                    pollId: sent.id,
                                    channelId: poll_Channel.id,
                                    pollTitle: poll_Title,
                                    pollChoices: poll_timeChoices,
                                    pollResults:[],
                                    pollParticipants:[],
                                    currentlyActive: true
                                })
                            }

                        }
                        interaction.reply({ content: `Your poll has been created.`, ephemeral: true })
                        dbdata.save()
        
                    })
                  });
            }

        }
        if(interaction.options.getSubcommand() === 'end'){
            const poll_Title =interaction.options.getString('title')

            pollsdb.findOne({ guildId: config.guildId, pollTitle:poll_Title, currentlyActive: true}, async (err, dbdata) => {

                const channel = client.channels.cache.get(dbdata.channelId)
                const msg = await channel.messages.fetch(dbdata.pollId)
                const Embed = msg.embeds[0]
                
                Embed.footer = {"text": `${dbdata.pollResults.length} votes - Final results`} 

                await msg.edit({ embeds: [Embed],components:[] }) 

                interaction.reply({ content: `The poll has been closed.`, ephemeral: true })
        
                dbdata.currentlyActive = false
                
                dbdata.save()
            })

        }

	},
};
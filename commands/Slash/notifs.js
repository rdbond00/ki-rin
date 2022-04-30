const { SlashCommandBuilder } = require('@discordjs/builders');

const streamers = require("../../Models/streamers")
const tweeters = require("../../Models/tweeters")
const youtubers = require("../../Models/youtubers")
const subreddits = require("../../Models/subreddits")
const twitchnotifs = require("../../Models/twitchnotifs")
const twitternotifs = require("../../Models/twitternotifs")
const youtubenotifs = require("../../Models/youtubenotifs")  
const redditnotifs = require("../../Models/redditnotifs") 


module.exports = {
	data: new SlashCommandBuilder()
		.setName('notifs')
		.setDescription('Notification system for social media'),                             
	async execute(interaction, client) {
   
        const Group = interaction.options._group
        const Sub = interaction.options.getSubcommand(['twitch','twitter','clear'])
        const twitchuser = interaction.options.getString('streamer')
        const twitteruser = interaction.options.getString('twitteruser')
        const ytChannelName = interaction.options.getString('channelname')
        const ytChannelId = interaction.options.getString('channelid')
        const subreddit = interaction.options.getString('subreddit')

        if(Group === 'add') {
              
            if(Sub === 'twitch') {

                

                streamers.findOne({ guildId: interaction.guildId, twitchuser: twitchuser }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new streamers({
                            guildId: interaction.guildId,
                            twitchuser: twitchuser,
                            Enabled: true
                        })
                        interaction.reply({ content: `${twitchuser} has been added to the list of streamers for notifications`, ephemeral: true });
                    }
                    data.save()
                });

            }

            if(Sub === 'twitter') {

               

                tweeters.findOne({ guildId: interaction.guildId, twitteruser: twitteruser }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new tweeters({
                            guildId: interaction.guildId,
                            twitteruser: twitteruser,
                            Enabled: true
                        })
                        interaction.reply({ content: `${twitteruser} has been added to the list of twitter users for notifications`, ephemeral: true });
                    }
                    data.save()
                });
            }

            if(Sub === 'youtube') {

               

                youtubers.findOne({ guildId: interaction.guildId, youtuberChannelName: ytChannelName }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new youtubers({
                            guildId: interaction.guildId,
                            youtuberChannelName: ytChannelName,
                            youtuberChannelId: ytChannelId,
                            uploadsPlaylistId: "",
                            Enabled: true
                        })
                        interaction.reply({ content: `${ytChannelName}'s channel has been added to the list of youtube channels for notifications`, ephemeral: true });
                    }
                    data.save()
                });
            }

            if(Sub === 'reddit') {

               

                subreddits.findOne({ guildId: interaction.guildId, subreddit: subreddit }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new subreddits({
                            guildId: interaction.guildId,
                            subreddit: subreddit,
                            Enabled: true
                        })
                        interaction.reply({ content: `The ${subreddit} subreddit has been added to the list of subreddits for notifications`, ephemeral: true });
                    }
                    data.save()
                });
            }
        } else if(Group === 'remove') {
            
            if(Sub === 'twitch') {

                streamers.findOneAndDelete({ guildId: interaction.guildId, twitchuser: twitchuser }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        interaction.reply({ content: `${twitchuser} does not exist in the list of streamers for notifications`, ephemeral: true });
                    } else {
                        twitchnotifs.findOneAndDelete({ guildId: interaction.guildId, twitchuser: twitchuser })
                        interaction.reply({ content: `${twitchuser} has been removed from the list of streamers for notifications`, ephemeral: true });
                    }
                });
            }

            if(Sub === 'twitter') {


                tweeters.findOneAndDelete({ guildId: interaction.guildId, twitteruser: twitteruser }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        interaction.reply({ content: `${twitteruser} does not exist in the list of twitter users for notifications`, ephemeral: true });
                    } else {
                        twitternotifs.findOneAndDelete({ guildId: interaction.guildId, twitteruser: twitteruser })
                        interaction.reply({ content: `${twitteruser} has been removed from the list of twitter users for notifications`, ephemeral: true });
                    }
                });
            }

            if(Sub === 'youtube') {


                youtubers.findOneAndDelete({ guildId: interaction.guildId, youtuberChannelName: ytChannelName }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        interaction.reply({ content: `${ytChannelName}'s channel does not exist in the list of youtube channels for notifications`, ephemeral: true });
                    } else {
                        youtubenotifs.findOneAndDelete({ guildId: interaction.guildId, youtuberChannelName: ytChannelName })
                        interaction.reply({ content: `${ytChannelName}'s channel has been removed from the list of youtube channels for notifications`, ephemeral: true });
                    }
                });
            }

            if(Sub === 'reddit') {


                subreddits.findOneAndDelete({ guildId: interaction.guildId, subreddit: subreddit }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        interaction.reply({ content: `The ${subreddit} subreddit does not exist in the list of subreddits for notifications`, ephemeral: true });
                    } else {
                        redditnotifs.findOneAndDelete({ guildId: interaction.guildId, subreddit: subreddit })
                        interaction.reply({ content: `The ${subreddit} subreddit has been removed from the list of subreddits for notifications`, ephemeral: true });
                    }
                });
            }

        } else if(Group === null && Sub === 'clear') {
            
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setLabel('Yes')
					.setStyle('SUCCESS'),
					new MessageButton()
					.setCustomId('no')
					.setLabel('No')
					.setStyle('DANGER'),	
			);

            interaction.reply({ content: `Are you sure you would like to remove **ALL** existing notifications?`, ephemeral: true, components: [row] });

            const filter = i => i.customId === 'yes' || i.customId === 'no';

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
	            if (i.customId === 'yes') {
                    
                    await streamers.deleteMany({ guildID : interaction.guildId })
                    await tweeters.deleteMany({ guildID : interaction.guildId })
                    await youtubers.deleteMany({ guildID : interaction.guildId })
                    await subreddits.deleteMany({ guildID : interaction.guildId })
                    await twitchnotifs.deleteMany({ guildId : interaction.guildId })
                    await twitternotifs.deleteMany({ guildId : interaction.guildId })
                    await youtubenotifs.deleteMany({ guildId : interaction.guildId })
                    await redditnotifs.deleteMany({ guildId : interaction.guildId })

                    i.update({ content: 'All exisiting notifications have now been cleared.', components: [] })
	            }
                if  (i.customId === 'no') {
                    i.update({ content: 'Action Cancelled.', components: [] })
                }
            });    
                




        } else if(Group === null && Sub === 'list') {
            
            const savedstreamers = await  streamers.find({guildId: interaction.guildId})
            const savedtweeters = await tweeters.find({ guildId: interaction.guildId})
            const savedyoutubers = await youtubers.find({ guildId: interaction.guildId})
            const savedsubreddits = await subreddits.find({ guildId: interaction.guildId})

            Embed = new MessageEmbed()
                .setTitle('Notification Settings:')

            
            if(savedstreamers.length > 0){
                Embed.addField('__Twitch__','Currently twitch notifications are setup for:')
                savedstreamers.forEach(s => {

                    if(s.Enabled === true){
                        Embed.addField(':green_circle:',s.twitchuser,true)
                    }
                    else {
                        Embed.addField(':red_circle:',s.twitchuser,true)
                    }
                    
                })    
             } else {Embed.addField('__Twitch__','There are no twitch notifications setup','\u200B')}
             
             if(savedyoutubers.length > 0){
                Embed.addField('__Youtube__','Currently youtube notifications are setup for:')
                savedyoutubers.forEach(s => {

                    if(s.Enabled === true){
                        Embed.addField(':green_circle:',s.youtuberChannelName,true)
                    }
                    else {
                        Embed.addField(':red_circle:',s.youtuberChannelName,true)
                    }
                    
                })
            } else {Embed.addField('__Youtube__','There are no youtube notifications setup','\u200B')}
            
            if(savedtweeters.length > 0){
                Embed.addField('__Twitter__','Currently twitter notifications are setup for:')
                savedtweeters.forEach(s => {

                    if(s.Enabled === true){
                        Embed.addField(':green_circle:',s.twitteruser,true)
                    }
                    else {
                        Embed.addField(':red_circle:',s.twitteruser,true)
                    }
                    
                })
            }else {Embed.addField('__Twitter__','There are no twitter notifications setup','\u200B')}
            
            if(savedtweeters.length > 0){
                Embed.addField('__Reddit__','Currently reddit notifications are setup for:')
                savedsubreddits.forEach(s => {

                    if(s.Enabled === true){
                        Embed.addField(':green_circle:',s.subreddit,true)
                    }
                    else {
                        Embed.addField(':red_circle:',s.subreddit,true)
                    }
                    
                })
            }else {Embed.addField('__Reddit__','There are no reddit notifications setup','\u200B')
        }


            interaction.reply({ embeds: [Embed], ephemeral: true});
        }

	},
};
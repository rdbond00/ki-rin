const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
const auths = require("../../Models/auths")
const twitchredeems = require("../../Models/twitchredeems")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('twitch')
		.setDescription('Manage twitch settings'),
	async execute(interaction) {

        auths.findOne({guildId: config.guildId},async (err, twitch) => {

            var data = {}
            var dataMap = new Map
            
            if(interaction.options.getSubcommand()==='get'){

            Embed = new MessageEmbed()

            const { data: redeem_list }  = await axios.get(
                `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=BROADCASTER_ID`,
                {
                    headers: {
                        'client-id': twitch.client_id,
                        Authorization: `Bearer ${twitch.access_token}`
                    },
                }
            
                ).catch(function (error){
                console.log(error)
            })

            Embed.setDescription(`Current Redeems for: Lucy Pyre`)

            redeem_list.data.forEach((redeem,x) => {

                    Embed.addField(`__Redeem__ #${x+1}`,`\n__Title__: *${redeem.title}*\n__Id__: *${redeem.id}*\n__Cost__: ${redeem.cost}\n__Enabled?__: ${redeem.is_enabled}\n__Prompt__: ${redeem.prompt}\n__Input Required?__: ${redeem.is_user_input_required}\n__Skip Queue?__: ${redeem.should_redemptions_skip_request_queue}`)

            })
                interaction.reply({ embeds:[Embed], ephemeral: true })
    
    
            } else if(interaction.options.getSubcommand()==='create'){



                interaction.options._hoistedOptions.forEach(option => {
                
                    if(option.name === 'should_redemptions_skip_queue'){
                        dataMap.set('should_redemptions_skip_request_queue',option.value)
                    }
                    dataMap.set(option.name,option.value)

                });
                    
                data = Object.fromEntries(dataMap)

                

                    var options = {
                        method: 'POST',
                        url: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
                        params: {broadcaster_id: 'BROADCASTER_ID'},
                        headers: {
                          'client-id': twitch.client_id,
                          Authorization: `Bearer ${twitch.access_token}`,
                          'Content-Type': 'application/json'
                        },
                        data: data
                      };
                      
                      axios.request(options).then(function (redeem) {


                        twitchredeems.findOne({ id: redeem.data.data[0].id}, async (err, data) => {
                            if(err) throw err;
                            if(!data) {
                                data = new twitchredeems({
                                    id:redeem.data.data[0].id,
                                    title:redeem.data.data[0].title,
                                    cost: redeem.data.data[0].cost,
                                    prompt:redeem.data.data[0].prompt,
                                    is_user_input_required:redeem.data.data[0].is_user_input_required
                                })
                                interaction.reply({ content: `A new redeem was created. (${redeem.data.data[0].id})`, ephemeral: true })
                            }
                            data.save()
                        });

                      }).catch(function (error) {
                        interaction.reply({ content: `There was an error creating the redeem. Please try again later`, ephemeral: true })
                        console.error(error);
                      });
                    
    

    
    
    
    
    
    
            } else if(interaction.options.getSubcommand()==='edit'){

                const redeem_id = interaction.options.getString('id')

                interaction.options._hoistedOptions.forEach(option => {
                    
                    if(option.name === 'id')return;
                    if(option.name === 'should_redemptions_skip_queue'){
                        dataMap.set('should_redemptions_skip_request_queue',option.value)
                    }
                    dataMap.set(option.name,option.value)

                });
                    
                data = Object.fromEntries(dataMap)

                

                    var options = {
                        method: 'PATCH',
                        url: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
                        params: {broadcaster_id: 'BROADCASTER_ID',id:redeem_id},
                        headers: {
                          'client-id': twitch.client_id,
                          Authorization: `Bearer ${twitch.access_token}`,
                          'Content-Type': 'application/json'
                        },
                        data: data
                      };
                      
                      axios.request(options).then(function (redeem) {

                        interaction.reply({ content: `Your redeem was edited. (${redeem.data.data[0].id})`, ephemeral: true })

                      }).catch(function (error) {
                        interaction.reply({ content: `There was an error editing the redeem. Please try again later`, ephemeral: true })
                        console.error(error);
                      });
                    
    

    
    
    
    
    
    
            } else if(interaction.options.getSubcommand()==='delete'){

                const redeem_id = interaction.options.getString('id')
    
    
            const { data: data }  = await axios.delete(
                `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=BROADCASTER_ID&id=${redeem_id}`,
                {
                    headers: {
                        'client-id': twitch.client_id,
                        Authorization: `Bearer ${twitch.access_token}`
                    },
                })

                twitchredeems.findOneAndDelete({id:redeem_id}, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        interaction.reply({ content: `The redeem has been removed from twitch. However it was not in the database.`, ephemeral: true });
                    } else {
                        interaction.reply({ content: `The redeem has been removed from twitch & the database`, ephemeral: true });
                    }
                });
    
            }


        })



	},
};
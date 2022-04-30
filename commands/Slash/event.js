const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Allows changing a channel to closed/open'),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel')
        const event_id = interaction.options.getString('event_id')


        if(interaction.options.getSubcommand() === 'open'){
        const event_type = interaction.options.getString('event_type').toLowerCase()
            if(event_id !== null){

                const event_vc = interaction.options.getChannel('event_vc')

                if(event_type === 'game'){
                    client.channels.cache.get(channel.id).permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: true ,CONNECT:true, SPEAK:true});
                } else {
                    client.channels.cache.get(channel.id).permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: true ,CONNECT:true, SPEAK:false});
                }

                


                const event_text = interaction.guild.channels.cache.get('CHANNEL_ID')
                const announcement = interaction.guild.channels.cache.get('DIFF_CHANNEL_ID')
                const event = await interaction.guild.scheduledEvents.fetch(event_id)
                const startTime = Math.trunc((event.scheduledStartTimestamp/1000)+300)

                event.edit({entityType:'VOICE',channel:event_vc})

                announcement.send(`${event.name} will be starting <t:${startTime}:R> in the <#${event_vc.id}> channel`).then(
                    event_text.send(`${event.name} will be starting <t:${startTime}:R>`)
                ) 

                event_text.threads.create({
                    name: event.name,
                    autoArchiveDuration: 1440,
                    reason: `To facilitate chat for ${event.name}`
                })

                interaction.reply({ content: `The <#${channel.id}> channel is now open to <@&MEMBER_ROLE>`, ephemeral: true })

            } else {

                if(event_type === 'game'){
                    client.channels.cache.get(channel.id).permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: true ,CONNECT:true, SPEAK:true});
                } else {
                    client.channels.cache.get(channel.id).permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: true ,CONNECT:true, SPEAK:false});
                }
                
                interaction.reply({ content: `The <#${channel.id}> channel is now open to <@&MEMBER_ROLE>`, ephemeral: true })
            }



        } else if(interaction.options.getSubcommand() === 'close'){

            client.channels.cache.get(channel.id).permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: false });
            interaction.reply({ content: `The <#${channel.id}> channel is now closed to <@&MEMBER_ROLE>`, ephemeral: true })

        }
	},
};
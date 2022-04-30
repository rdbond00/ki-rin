const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed,MessageActionRow} = require('discord.js')
const modals = require("../../Models/modals")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('form')
		.setDescription('Create a new form'),
	async execute(interaction) {
		if(interaction.options.getSubcommand()==='create'){
			const channel = client.channels.cache.get(interaction.options.getChannel(('channel')).id)
			const title = interaction.options.getString('title')
			const description = interaction.options.getString('description')
			var inputs = interaction.options.getString('label').split(';').length
			var labels = interaction.options.getString('label').split(';')
			var styles = interaction.options.getString('style').split(';')
			var MinLengths = interaction.options.getString('minlength').split(';')
			var MaxLengths = interaction.options.getString('maxlength').split(';')
			var Requireds = interaction.options.getString('required').split(';')
			var TextInputs = []
			

			const Embed = new MessageEmbed()
			const row1 = new MessageActionRow()
	
			Embed.setTitle(title)
			Embed.setDescription(description)

			labels.forEach((label,x)=>{
				//var b = new Boolean(Requireds[x])
				
				TextInputs.push({
					CustomId:`form${modal_count+1}_input${x+1}`,
					Label: label,
					Style: styles[x],
					MinLength:Number(MinLengths[x]),
					MaxLength:Number(MaxLengths[x]),
					Placeholder:'Enter text here.',
					Required:JSON.parse(Requireds[x])
				})
				
			})
			
			row1.addComponents(
				new MessageButton()
				.setCustomId(`show_form`)
				.setLabel(`Show Form`)
				.setStyle('PRIMARY')
				)
			
					channel.send({embeds:[Embed],components:[row1]}).then(message => {

						modals.findOne({guildId: config.guildId,messageId: message.id},async (err, data) => {

							if(err) throw err;
                            if(!data) {
                                data = new modals({
									guildId: config.guildId,
									messageId: message.id,
									channelId: interaction.options.getChannel(('channel')).id,
									customId:`modal_form${modal_count+1}`,
									title:title,
									Initiated:false,
									TextInputs: TextInputs
                                })
							
								modal_count = modal_count+1
							}

								data.save()
							

						})
						

					})
					interaction.reply({ content: `Your form has been created`, ephemeral: true })
		} else if(interaction.options.getSubcommand()==='delete'){
			const title = interaction.options.getString('title')

			modals.findOneAndDelete({guildId:config.guildId,title:title}, async (err, data) => {
				if(err) throw err;
				if(!data) {
					interaction.reply({ content: `There was no form with that title.. did you misspell the title?`, ephemeral: true });
				} else {

					await interaction.member.guild.channels.cache.get(data.channelId).messages.fetch(data.messageId).then(message =>{
						message.delete().catch(error => {console.log(error)})
					})
					interaction.reply({ content: `The form with the title: ${title} has been removed`, ephemeral: true });
					modal_count = modal_count - 1
				}
			})
		} else if(interaction.options.getSubcommand()==='responses'){
			const title = interaction.options.getString('title')
			const visible = interaction.options.getBoolean('visible')
			const Embed = new MessageEmbed()

			modals.findOne({guildId: config.guildId,title: title},async (err, data) => {

				var inputs = []

				data.TextInputs.forEach((input,x)=>{
					eval('global.answers' + (x+1) + '= ' + '[]')
					eval('global.answers' + (x+1) + '= ' + '[]')
					inputs.push(input.CustomId)
				})


				data.Responses.forEach((response,x)=>{
					data.TextInputs.forEach((input,y)=>{
						
						if(response.CustomId === input.CustomId){
							eval('answers' + (y+1)+'.push(response.response)')
						}
					})

				})

				Embed.setTitle(`${title} Responses`)
				var description = `\n`

				data.TextInputs.forEach((input,y)=>{
					if(y>0){
						const counts = {};
						description = description + `\n__${input.Label}__\n\n`
						eval('answers' + (y+1)).forEach((x) => {
						  counts[x] = (counts[x] || 0) + 1;
						});
						
						const answer_list = Object.entries(counts)
					
						answer_list.forEach((answer,x)=>{
							description = description +`${answer[0]} (${answer[1]})\n`
						})
					}else{
						const counts = {};
						description = description + `__${input.Label}__\n\n`
						eval('answers' + (y+1)).forEach((x) => {
						  counts[x] = (counts[x] || 0) + 1;
						});
						
						const answer_list = Object.entries(counts)
					
						answer_list.forEach((answer,x)=>{
							description = description +`${answer[0]} (${answer[1]})\n`
						})
					}


				})

				Embed.setDescription(description)  

				if(visible === true){
					interaction.reply({embeds: [Embed]})
				} else if(visible === false){
					interaction.reply({embeds: [Embed],ephemeral:true})
				}



			})
		}
	},
};
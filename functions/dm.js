const { MessageEmbed } = require('discord.js')

module.exports = (message) => {
        if (message.author.bot) return;
        if (message.channel.type == 'DM') {
                
		const log_channel = client.channels.cache.get(logChannelIDs.feedbacklog)
                const attachments = []
                if(message.attachments.size === 0){
                        const RichEmbed = new MessageEmbed()
                        .setColor('#00e600')
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        .setDescription(`**ModMail received** \n ${message.content}`)
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`);

                log_channel.send({ embeds: [RichEmbed] })
                } else if (message.attachments.size >= 1){

                        message.attachments.forEach(attachment => {
                                attachments.push(attachment.url)
                        })

                        const RichEmbed = new MessageEmbed()
                        .setColor('#00e600')
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        .setDescription(`**ModMail received** \n ${message.content} \n **Files were attached, please see above this embed**`)
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`);
                log_channel.send({ files: attachments ,embeds: [RichEmbed]})

                }

        };
	};
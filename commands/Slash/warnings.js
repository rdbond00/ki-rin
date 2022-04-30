const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("../../Models/WarningDb")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warning')
		.setDescription('Warnings System')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Adds a new warning')
                
                )
        .addSubcommand(subcommand =>
            subcommand
               .setName('check')
               .setDescription('Checks existing warnings')
               
                )
        .addSubcommand(subcommand =>
            subcommand
               .setName('remove')
               .setDescription('Removes a warning')
                       
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clears all warnings from a user')
                               
                ),                                
	async execute(interaction, client) {
        const Sub = interaction.options.getSubcommand(['add','check','remove','clear']);
        const Target = interaction.options.getMember('target');
        const Reason = interaction.options.getString('reason');
        const Evidence  = interaction.options.getString('evidence') || 'None provided.';
        const WarnID  = interaction.options.getNumber('warnid') - 1;
        const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString();




        if(Sub === 'add') {
                 
            db.findOne({ guildId: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new db({
                        guildId: interaction.guildId,
                        UserID: Target.id,
                        UserTag: Target.user.tag,
                        Content: [
                            {
                                ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: Reason,
                                Evidence: Evidence,
                                Date: WarnDate

                            }
                        ],
                    })
                } else {
                    const obj = {
                        ExecuterID: interaction.user.id,
                        ExecuterTag: interaction.user.tag,
                        Reason: Reason,
                        Evidence: Evidence,
                        Date: WarnDate
                    }
                    data.Content.push(obj)
                }
                data.save()
            });

            interaction.reply({embeds: [new MessageEmbed()
                .setTitle("Warning System")
                .setColor("BLURPLE")
                .setDescription(`Warning Added: ${Target.user.tag} | ||${Target.id}||\n**Reason**: ${Reason}\n**Evidence**: ${Evidence}`)]})


        } else if(Sub === 'check') {
            
            db.findOne({ guildId: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                if(err) throw err;
                if(data) {
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`__Warnings for: ${Target.user.tag}__ \n\n${data.Content.map(
                            (w, i) => `**ID**: ${i + 1}\n**By**: ${w.ExecuterTag}\n**Date**: ${w.Date}\n**Reason**: ${w.Reason}\n**Evidence**: ${w.Evidence}
                            \n`
                        ).join(" ")}`)]});
                }   else {
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`${Target.user.tag} | ||${Target.id}|| has no warnings.`)]})
                }                
            })


        } else if(Sub === 'remove') {
             
            db.findOne({ guildId: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                if(err) throw err;
                if(data) {
                    data.Content.splice(WarnID, 1)
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`${Target.user.tag}'s warning id: ${WarnID + 1} has been removed.`)]})
                        data.save()
                }   else {
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`${Target.user.tag} | ||${Target.id}|| has no warnings.`)]})
                }                
            })            


        } else if(Sub === 'clear') {
            
            db.findOne({ guildId: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                if(err) throw err;
                if(data) {
                    await db.findOneAndDelete({guildId: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag })
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`${Target.user.tag}'s warnings were cleared.`)]})        
                }   else {
                    interaction.reply({embeds: [new MessageEmbed()
                        .setTitle("Warning System")
                        .setColor("BLURPLE")
                        .setDescription(`${Target.user.tag} | ||${Target.id}|| has no warnings.`)]})
                }
                

            })


        }        
        
	},
};
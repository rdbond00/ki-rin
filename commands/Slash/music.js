const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('Music System')
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Plays a new song'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Stops the current song'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('skip')
                .setDescription('Skips the current song'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Pauses currently playing music'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Resumes currently paused music'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('repeat')
                .setDescription('Sets whether a song should repeat'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('volume')
                .setDescription('Sets the volume of the music to a different level'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('jump')
                .setDescription('Jumps to a specific song in the queue'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('getqueue')
                .setDescription('Display the current song queue'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('removequeue')
                .setDescription('Removes a specific song from the queue')
                
                ),               
	async execute(interaction, client) {
        const Sub = interaction.options.getSubcommand(['play','stop','skip','pause','resume','repeat','volume','jump','getqueue','removequeue']);
        const channel = interaction.member.voice.channel
        if(Sub === 'play'){

            
            const song = interaction.options.getString('song').toString()
            
            music.play({
                interaction: interaction,
                channel: channel,
                song: song
            })

            interaction.reply({content: `Attempting to play ${song} in ${channel}`, ephemeral:true})
        } else if(Sub === 'stop') {
            
            music.stop({ interaction: interaction });
            interaction.reply({content: `Music stopped in ${channel}`, ephemeral:true})
        } else if(Sub === 'skip') {

            music.skip({ interaction: interaction });
            interaction.reply({content: `Skipping current song in ${channel}`, ephemeral:true})
        } else if(Sub === 'pause') {

            music.pause({ interaction: interaction });
            interaction.reply({content: `Music paused in ${channel}`, ephemeral:true})
        } else if(Sub === 'resume') {

            music.resume({ interaction: interaction });
            interaction.reply({content: `Attempting to resume music in ${channel}`, ephemeral:true})
        } else if(Sub === 'repeat') {

            const OnOrOff = interaction.options.getBoolean('onoff');

            music.repeat({
                interaction: interaction,
                value: OnOrOff
            });
            interaction.reply({content: `Repeat has been set to ${OnOrOff} in ${channel}`, ephemeral:true})
        } else if(Sub === 'volume') {

            const volume = interaction.options.getInteger('volume');
            
            music.volume({
                interaction: interaction,
                volume: volume
            });
            interaction.reply({content: `Setting the volume to ${volume} in ${channel}`, ephemeral:true})
        } else if(Sub === 'jump') {

            const number = interaction.options.getInteger('number');

            music.jump({
                interaction: interaction,
                number: number
            });
            interaction.reply({content: `Jumping to song number ${number} in ${channel}`, ephemeral:true})
        } else if(Sub === 'getqueue') {

            console.log(await(music.getQueue({ interaction: interaction })));

        } else if(Sub === 'removequeue') {

            const number = interaction.options.getInteger('number');

            music.removeQueue({
                interaction: interaction,
                number: number 
            });
            interaction.reply({content: `Removing song number ${number} in ${channel}`, ephemeral:true})
        }

	},
};
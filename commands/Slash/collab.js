const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collab')
		.setDescription('Manage collaborators')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Adds the collab role to new users')
                
                )
        .addSubcommand(subcommand =>
            subcommand
               .setName('clear')
               .setDescription('Removes the collab role from everyone')
                        
                ),                
	async execute(interaction) {
        if(interaction.options.getSubcommand() === 'add') {
            
            
            if(Array.from(interaction.options._hoistedOptions).length === 1){
                const user1 = interaction.options.getUser('user1').id
                
                await client.guilds.cache.get(config.guildId).members.cache.get(user1).roles.add(RoleIDs.CollabRole)
                interaction.reply({ content: `1 new collaborator added`, ephemeral: true })
            }
            if(Array.from(interaction.options._hoistedOptions).length === 2){
                const user1 = interaction.options.getUser('user1').id
                const user2 = interaction.options.getUser('user2').id

                await client.guilds.cache.get(config.guildId).members.cache.get(user1).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user2).roles.add(RoleIDs.CollabRole)
                interaction.reply({ content: `2 new collaborators added`, ephemeral: true })
            }
            if(Array.from(interaction.options._hoistedOptions).length === 3){
                const user1 = interaction.options.getUser('user1').id
                const user2 = interaction.options.getUser('user2').id
                const user3 = interaction.options.getUser('user3').id

                await client.guilds.cache.get(config.guildId).members.cache.get(user1).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user2).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user3).roles.add(RoleIDs.CollabRole)
                interaction.reply({ content: `3 new collaborators added`, ephemeral: true })
            }
            if(Array.from(interaction.options._hoistedOptions).length === 4){
                const user1 = interaction.options.getUser('user1').id
                const user2 = interaction.options.getUser('user2').id
                const user3 = interaction.options.getUser('user3').id
                const user4 = interaction.options.getUser('user4').id

                await client.guilds.cache.get(config.guildId).members.cache.get(user1).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user2).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user3).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user4).roles.add(RoleIDs.CollabRole)
                interaction.reply({ content: `4 new collaborators added`, ephemeral: true })
            }
            if(Array.from(interaction.options._hoistedOptions).length === 5){
                const user1 = interaction.options.getUser('user1').id
                const user2 = interaction.options.getUser('user2').id
                const user3 = interaction.options.getUser('user3').id
                const user4 = interaction.options.getUser('user4').id
                const user5 = interaction.options.getUser('user5').id

                await client.guilds.cache.get(config.guildId).members.cache.get(user1).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user2).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user3).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user4).roles.add(RoleIDs.CollabRole)
                await client.guilds.cache.get(config.guildId).members.cache.get(user5).roles.add(RoleIDs.CollabRole)
                interaction.reply({ content: `5 new collaborators added`, ephemeral: true })
            }
            
        }

        if(interaction.options.getSubcommand() === 'clear') {
            const collabrole = client.guilds.cache.get(config.guildId).roles.cache.get(client.guilds.cache.get(config.guildId).roles.cache.find(role => role.name === 'Stream Guests').id)
            
            collabrole.members.forEach((member, i) => { // Looping through the members of Role.
                setTimeout(() => {
                    member.roles.remove(collabrole); // Removing the Role.
                }, 1000);
            });
            
            interaction.reply({ content: `List of collaborators has been purged`, ephemeral: true })

            
        }
        
	},
};
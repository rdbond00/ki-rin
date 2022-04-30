// Called every time a message comes in
async function slashCommandhandler (interaction) {
        if (!interaction.isCommand()) return;
        
        const slashcommand = client.slashcommands.get(interaction.commandName);

        if (!slashcommand) return;
        
        try {
            await slashcommand.execute(interaction)
            commandsRun.inc()
        } catch (error) {
            console.error(error);
            commandsRun.dec()
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            
        }

}
  module.exports = slashCommandhandler
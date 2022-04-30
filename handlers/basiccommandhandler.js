// Called every time a message comes in
async function basicCommandhandler (message) {

	if (!message.content.startsWith(savedSettings.prefix) || message.author.bot) return;

	const args = message.content.slice(savedSettings.prefix.length).split(/ +/);

	const command = args.shift(1).toLowerCase();
	
	const cmd = client.basiccommands.get(command) || client.basiccommands.find(cmd => cmd.alias && cmd.alias.includes(command));

	try {
		if (cmd) cmd.execute(message, args);
		commandsRun.inc()
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
		commandsRun.dec()
	}



}
  module.exports = basicCommandhandler
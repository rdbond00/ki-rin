const fs = require('fs');
var quote_text = fs.readFileSync("./quotes.txt", "utf-8");
var quotes = quote_text.split(";")


module.exports = {
	name: 'quote',
	description: 'Allows saving quotes for later',
	alias: 'q',
	expectedArgs: null,
	reqPerms: ['everyone'],
	execute(message, args) {

		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 && message.channel.id != 937829490556547176 && message.channel.id != 956359784376963172 && message.channel.id != 956358085146992682) return;
		
		if(args.length < 1 || args == undefined) {
			
		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		message.channel.send(randomQuote.replace("'",""))
		
		}	
		

		if(args[0] === 'add') {
			if(!message.member.roles.cache.has('937858030874271856'))return message.reply("Sorry, you don't have permissions to use this!");

				fs.appendFile('./quotes.txt', `;${args.slice(1).join(' ')}`, (err) => {
					if (err) console.log(err);
				});

			message.channel.send("New quote has been added to the list")
			
		}	
		if(args[0] === 'clear') {
			
			quotes = [];
			
			fs.writeFile('./quotes.txt', quotes.toString(), function(){message.channel.send("File cleared.")})
			

		}
		if(args[0] === 'list') {
			if(quotes.toString === ""){
				message.channel.send("There are no quotes.")
			}
			message.channel.send(quotes.join(`\n`))
		}
		if(args[0] === 'edit') {
			
			quotes.splice(args[1],1,args[2])
			
			message.channel.send("Quote edited")
		}
		if(args[0] === 'help') {
			
			if (message.member.hasPermission('ADMINISTRATOR')) {
			
			message.channel.send(`**Commands:** \n \n ?quote --*Sends a random quote \n ?quote add [quote] --*Adds new quote* \n ?quote edit [Num] [quote] --*Edits the specified quote* \n ?quote list --*Lists out all stored quotes* \n \n **Important commands** \n \n ?quote clear --*Removes all stored quotes* \n ?quote save --*Saves all quotes in case bot has to be restarted*`)
			} 
			if (!message.member.hasPermission('ADMINISTRATOR')) {
				
			message.channel.send(`**Commands:** \n \n ?quote [@user] --*Sends a random quote to the mentioned user*`)
			}

		}		
		
		
	},
};
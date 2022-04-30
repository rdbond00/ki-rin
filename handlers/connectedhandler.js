// Called every time the bot connects to Twitch chat

const mongoose = require('mongoose')


function connectedhandler () {
	console.log('Ready!');
	client.user.setPresence({ activities: [{ name: "being Lucy's fave bot | !help",type: 'COMPETING'}], status: 'Online' });

	if(!config.Database) return;
	mongoose.connect(config.Database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() => {
		console.log(`The client is now connected to the database!`)
	}).catch((err) => {
		console.log(err)
	});
	
	client.functions.get('checkForSettings').function()
	client.functions.get('twitchAuthy').function()
	client.functions.get('checkForPosts').function()
	client.functions.get('checkForBdays').function()
	client.functions.get('checkForLive').function()
	client.functions.get('checkForTweets').function()
	client.functions.get('checkForVideos').function()
	client.functions.get('checkForReddits').function()
	client.functions.get('checkForReactRoles').function()
	//client.functions.get('checkForRedeems').function()
	client.functions.get('ModalInitiation').function()
	//client.functions.get('updateMetrics').function()

  }

  module.exports = connectedhandler

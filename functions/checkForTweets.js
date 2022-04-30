const {MessageEmbed} = require('discord.js')
const axios = require('axios')
const tweetersdb = require("../Models/tweeters")
const db = require("../Models/twitternotifs")



async function checkForTweets() {

tweetersdb.find({guildId: config.guildId},async (err, tweeterdata) => {

    tweeterdata.forEach(async twitterlogin => { 
        
        const twitteruser = twitterlogin.twitteruser
        var query = `from:${twitteruser}`

        query += ' -is:reply -is:quote'


        const { data: twitterdata }  = await axios.get(
            `https://api.twitter.com/2/tweets/search/recent?query=${query}&tweet.fields=id,created_at,author_id,in_reply_to_user_id,referenced_tweets,text,entities,context_annotations,public_metrics&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld&expansions=author_id,attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text&poll.fields=duration_minutes,end_datetime,id,options,voting_status&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`,
            {
                headers: {
                    Authorization: 'Bearer INSERT_TOKEN'
                },
            }
        )    
            if(twitterdata.meta.result_count === 0)return;
            //Time to name a few constants here to make things simpler
            const recentTweets = twitterdata.data
            const recentMedia = twitterdata.includes.media
            const recentUser = twitterdata.includes.users[0]
            const recenttweet = recentTweets[0]  
            var recenttweetMedia = {}

            if(recentMedia !== undefined && recenttweet.attachments !== undefined){
                 recenttweetMedia = recentMedia.find(media => media.media_key === recenttweet.attachments.media_keys[0])
            }

            //Combine our first tweet object with our first media object so that we can call everything in the same place    
         tweet = {
              ...recenttweet,
              media: recenttweetMedia,
              user: recentUser
            }
        
            const guild = await client.guilds.fetch(config.guildId)
            const channel = guild.channels.cache.get(logChannelIDs.twitternotifs)

         //Remove any urls in the tweet since we will be grabbing the media separately anyway
            tweet.text = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')


        db.findOne({ guildId: config.guildId, twitteruser: twitteruser}, async (err, dbdata) => {
            if(err) throw err;
            if(!dbdata){
                dbdata = new db({
                    guildId: config.guildId,
                    lastmessageId: 'No message has been sent',
                    twitteruser: twitteruser,
                    lastTweetID: tweet.id,
                })

                //Check if the most recent tweet is a retweet or not as the url for a retweet is different
                if(tweet.referenced_tweets !== undefined){
                    
                    await channel.send({ content: `${tweet.user.name}Retweed\nhttps://twitter.com/${tweet.entities.mentions[0].username}/status/${tweet.referenced_tweets[0].id}` }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
    
                } else {
    
                    await channel.send({ content: `${tweet.entities.urls[0].expanded_url}` }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
    
                }
                



            } else if(dbdata.lastTweetID !== tweet.id) {

                //Check if the most recent tweet is a retweet or not as the url for a retweet is different
                if(tweet.referenced_tweets !== undefined){
                    
                    await channel.send({ content: `${tweet.user.name}Retweed\nhttps://twitter.com/${tweet.entities.mentions[0].username}/status/${tweet.referenced_tweets[0].id}` }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
    
                } else {
                    
                    await channel.send({ content: `https://twitter.com/${twitteruser}/status/${tweet.id}` }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
    
                }

                //Change the lastTweetID in the db to show that we pulled a new tweet
                dbdata.lastTweetID = tweet.id

            }
            dbdata.save()
        })
      
    })

})

setTimeout(checkForTweets, 1000 * 60)
  
}

module.exports.function = checkForTweets

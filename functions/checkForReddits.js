const {MessageEmbed} = require('discord.js')
const axios = require('axios')
const subredditsdb = require("../Models/subreddits")
const db = require("../Models/redditnotifs")



async function checkForReddits() {

    subredditsdb.find({guildId: config.guildId},async (err, subredditdata) => {

        subredditdata.forEach(async subreddit => {

            db.findOne({ guildId: config.guildId, subreddit: subreddit.subreddit}, async (err, dbdata) => {
                if(err) throw err;
                if(!dbdata) {
                    dbdata = new db({
                        guildId: config.guildId,
                        lastmessageId: '',
                        subreddit: subreddit.subreddit,
                        lastpostId: '',
                    })
                }
                
                //Time to set some of our query variables
                const listing = 'hot'
                const limit = "1"
                const timeframe = 'day'

                //Grabs the newest post in the subreddit
                const { data: redditdata }  = await axios.get(`https://www.reddit.com/r/${subreddit.subreddit}/${listing}.json?limit=${limit}&t=${timeframe}`)   

                //Time to set some variables that we are getting from the redditdata
                var postnum = 0
                const pinned = redditdata.data.children[postnum].data.stickied

                //Check if post is a pinned post, and if so skip it
                if(pinned === true) {
                    postnum = 1
                } 

                
                const redditpostId = redditdata.data.children[postnum].data.id

                //Check if post is the same as the last we saw, and if so do nothing else
                if(redditpostId === dbdata.lastpostId) {return}

                const posttype = redditdata.data.children[postnum].data.post_hint
                const post = redditdata.data.children[postnum].data
                const votes = post.ups + post.downs

                //Check if post is an image
                if(posttype === 'image') {

                    const guild = await client.guilds.fetch(config.guildId)
                    const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)

                    const Embed = new MessageEmbed()
                    .setTitle(`${post.subreddit_name_prefixed} - ${post.title}`)
                    .setURL(`https://reddit.com${post.permalink}`)
                    .setColor('#fdfdfd')
                    .setTimestamp()
                    .setFooter(`${votes} votes and ${post.num_comments} comments so far on Reddit`)
                    .setImage(post.url)
                    .setAuthor('reddit','',`https://reddit.com/`)
                    .setDescription(`[${post.link_flair_text}]\n${post.selftext}`)
                    .addFields(
                        {name: '\u200B',value: `[Posted by u/${post.author}](https://reddit.com/u/${post.author})` },
                    )
                    

                    await channel.send({ embeds: [Embed] }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });

                } 
                //Check if post is a text-only post
                else if(posttype === 'self' || undefined) {
                    console.log(`Posted by u/${post.author}`)
                    console.log(post.title)
                    console.log(post.link_flair_text)
                    console.log(post.selftext)
                    console.log(`${votes} votes and ${post.num_comments} comments so far on Reddit`)

                    const guild = await client.guilds.fetch(config.guildId)
                    const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)

                    const Embed = new MessageEmbed()
                    .setTitle(`${post.subreddit_name_prefixed} - ${post.title}`)
                    .setURL(`https://reddit.com${post.permalink}`)
                    .setColor('#fdfdfd')
                    .setTimestamp()
                    .setFooter(`${votes} votes and ${post.num_comments} comments so far on Reddit`)
                    .setAuthor('reddit','',`https://reddit.com/`)
                    .setDescription(`[${post.link_flair_text}]\n${post.selftext}`)
                    .addFields(
                        {name: '\u200B',value: `[Posted by u/${post.author}](https://reddit.com/u/${post.author})` },
                    )

                    await channel.send({ embeds: [Embed] }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
                }
                //Check if post is a video
                else if (posttype === 'video') {

                    const guild = await client.guilds.fetch(config.guildId)
                    const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)

                    await channel.send({ content: post.url }).then(sent => { // 'sent' is that message you just sent
                        dbdata.lastmessageId = sent.id
                    });
                }

                
                dbdata.lastpostId = redditpostId

                dbdata.save()
            })

            

        })

    })

    setTimeout(checkForReddits, 1000 * 60)

}

module.exports.function = checkForReddits

const {MessageEmbed} = require('discord.js')
const axios = require('axios')
const youtubersdb = require("../Models/youtubers")
const db = require("../Models/youtubenotifs")



async function checkForVideos() {

youtubersdb.find({guildId: config.guildId},async (err, youtuberdata) => {

    youtuberdata.forEach(async youtuber => {

        const ytName = youtuber.youtuberChannelName
        const ytChannelId = youtuber.youtuberChannelId
        
            //Check if we have the uploads playlist ID
            if(youtuber.uploadsPlaylistId === ""){
            
            const part = 'contentDetails'
            const key = 'INSERT_KEY'
            
            var query = `part=${part}&id=${ytChannelId}&key=${key}`

            const { data: youtubeChanneldata }  = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/channels?${query}`
            ) 

            const uploadsId = youtubeChanneldata.items[0].contentDetails.relatedPlaylists.uploads
            youtuber.uploadsPlaylistId = uploadsId

            youtuber.save()

        }
        

        const ytUploadsId = youtuber.uploadsPlaylistId
        const part = 'snippet'
        const maxresults = '1'
        const key = 'INSERT_KEY'
        
        var query = `part=${part}&playlistId=${ytUploadsId}&maxResults=${maxresults}&key=${key}`
        
        const { data: youtubeVideodata }  = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?${query}`
        ) 

        //Constructing constant variables
        const guild = await client.guilds.fetch(config.guildId)
        const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
        const recentVideoId = youtubeVideodata.items[0].snippet.resourceId.videoId


        db.findOne({guildId: config.guildId, youtuberChannelName: ytName},async (err, dbdata) => {
            if(err) throw err;
            if(!dbdata) {
                dbdata = new db({
                    guildId : config.guildId,
                    lastmessageId : "",
                    youtuberChannelName : ytName,
                    youtuberChannelId : ytChannelId,
                    uploadsPlaylistId: ytUploadsId,
                    lastVideoID : recentVideoId
                })

                await channel.send({ content: `https://www.youtube.com/watch?v=${recentVideoId}` }).then(sent => { // 'sent' is that message you just sent
                    dbdata.lastmessageId = sent.id
                });

            } else if(dbdata.lastVideoID !== recentVideoId) {

                await channel.send({ content: `https://www.youtube.com/watch?v=${recentVideoId}` }).then(sent => { // 'sent' is that message you just sent
                    dbdata.lastmessageId = sent.id
                });
                
                dbdata.lastVideoID = recentVideoId

            }
            
            dbdata.save()
        })  
        

        
    })

})

setTimeout(checkForVideos, 1000 * 60)

}

module.exports.function = checkForVideos

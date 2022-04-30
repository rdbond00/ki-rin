const {MessageEmbed} = require('discord.js')
const axios = require('axios')
const streamersdb = require("../Models/streamers")
const auths = require("../Models/auths")
const db = require("../Models/twitchnotifs")


global.currentlylive = false
global.notifId = ''




async function checkForLive() {



    auths.findOne({guildId: config.guildId},async (err, authdata) => {

        twitch = Object.assign(authdata)

        streamersdb.find({guildId: config.guildId},async (err, streamerdata) => {

            streamerdata.forEach(async streamerlogin => { 
        
                const streamer = streamerlogin.twitchuser
        
                const { data: streamdata }  = await axios.get(
                    `https://api.twitch.tv/helix/streams?user_login=${streamer}`,
                    {
                        headers: {
                            'Client-ID': twitch.client_id,
                            Authorization: `Bearer ${twitch.access_token}`
                        },
                    }
                ).catch(function (error){
                    console.log(error)
                })
            
                const { data: userdata }  = await axios.get(
                    `https://api.twitch.tv/helix/users?login=${streamer}`,
                    {
                        headers: {
                            'Client-ID': twitch.client_id,
                            Authorization: `Bearer ${twitch.access_token}`
                        },
                    }
                ).catch(function (error){
                    console.log(error)
                })
            
                if(userdata['data'][0] !== undefined) {
                    //const { id, login, display_name, type, broadcaster_type, description, profile_image_url, offline_image_url, view_count, created_at } = userdata['data'][0]
                }
            
                //Check if streaming or not
                //if streamdata is undefined then there is no stream object meaning the user isnt Live
                
                if(streamdata['data'][0] !== undefined) {
                    
                    const guild = await client.guilds.fetch(config.guildId)
                    const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
                    const { id, user_id, user_login, user_name, game_id, game_name, type, title, viewer_count, started_at, language, thumbnail_url, is_mature } = streamdata['data'][0]
                    const profile_image = userdata['data'][0].profile_image_url
            
                    db.findOne({ guildId: config.guildId, twitchuser: streamer}, async (err, dbdata) => {
                        if(err) throw err;
                
                        if(!dbdata) {
                            dbdata = new db({
                                guildId: config.guildId,
                                messageId: 'No message has been sent',
                                twitchuser: streamer,
                                currentlylive: true,
                                messageposted: false
                            })
                            const guild = await client.guilds.fetch(config.guildId)
                            const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
                
                            const Embed = new MessageEmbed()
                            if(title === ''){
                                Embed.setTitle(`*No title provided*`)
                            }
                            else{
                                Embed.setTitle(title)
                            }
                            
                            Embed.setURL(`https://www.twitch.tv/${streamer}`)
                            Embed.setColor('#00e600')
                            Embed.setTimestamp()
                            Embed.setFooter({text:`Twitch Notifications`})
                            Embed.setThumbnail(profile_image)
                            Embed.setImage(`${thumbnail_url.replace('{width}', '400').replace('{height}', '200')}`)
                            Embed.setAuthor({name: user_name, iconURL: profile_image})
        
                            if(game_name === ''){
                                Embed.setFields([
                                    {
                                        "name": "Game",
                                        "value": `*No game name provided.*`,
                                        "inline": true
                                      },
                                      {
                                        "name": "Viewers",
                                        "value": `${viewer_count}`,
                                        "inline": true
                                      }
                                ])
                            }
                            else {
                            Embed.setFields([
                                {
                                    "name": "Game",
                                    "value": `${game_name}`,
                                    "inline": true
                                  },
                                  {
                                    "name": "Viewers",
                                    "value": `${viewer_count}`,
                                    "inline": true
                                  }
                            ])
                        }
                
                            await channel.send({content:'<@&ROLE_NAME>', embeds: [Embed] }).then(sent => { // 'sent' is that message you just sent
                                notifId = sent.id
                              });
                            dbdata.messageId = notifId
                            dbdata.messageposted = true
                              
                        } else if(dbdata.currentlylive === false && dbdata.messageposted === false || dbdata.currentlylive === true && dbdata.messageposted === false) {
                            const guild = await client.guilds.fetch(config.guildId)
                            const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
                
                            const Embed = new MessageEmbed()
                            if(title === ''){
                                Embed.setTitle(`*No title provided*`)
                            }
                            else{
                                Embed.setTitle(title)
                            }
                            
                            Embed.setURL(`https://www.twitch.tv/${streamer}`)
                            Embed.setColor('#00e600')
                            Embed.setTimestamp()
                            Embed.setFooter({text:`Twitch Notifications`})
                            Embed.setThumbnail(profile_image)
                            Embed.setImage(`${thumbnail_url.replace('{width}', '400').replace('{height}', '200')}`)
                            Embed.setAuthor({name: user_name, iconURL: profile_image})
        
                            if(game_name === ''){
                                Embed.setFields([
                                    {
                                        "name": "Game",
                                        "value": `*No game name provided.*`,
                                        "inline": true
                                      },
                                      {
                                        "name": "Viewers",
                                        "value": `${viewer_count}`,
                                        "inline": true
                                      }
                                ])
                            }
                            else {
                            Embed.setFields([
                                {
                                    "name": "Game",
                                    "value": `${game_name}`,
                                    "inline": true
                                  },
                                  {
                                    "name": "Viewers",
                                    "value": `${viewer_count}`,
                                    "inline": true
                                  }
                            ])
                        }
                
                            await channel.send({content:'<@&ROLE_NAME>', embeds: [Embed] }).then(sent => { // 'sent' is that message you just sent
                                notifId = sent.id
                              });
        
                            dbdata.messageId = notifId
                            dbdata.currentlylive = true
                            dbdata.messageposted = true
        
                        } else if(dbdata.currentlylive === true && dbdata.messageposted === true){
                            const guild = await client.guilds.fetch(config.guildId)
                            const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
                            const msg = await channel.messages.fetch(dbdata.messageId)
                            const Embed = new MessageEmbed()
                            if(title === ''){
                                Embed.setTitle(`*No title provided*`)
                            }
                            else{
                                Embed.setTitle(title)
                            }
                            
                            Embed.setURL(`https://www.twitch.tv/${streamer}`)
                            Embed.setColor('#00e600')
                            Embed.setTimestamp()
                            Embed.setFooter({text:`Twitch Notifications`})
                            Embed.setThumbnail(profile_image)
                            Embed.setImage(`${thumbnail_url.replace('-{width}x{height}', '')}`)
                            Embed.setAuthor({name: user_name, iconURL: profile_image})
        
                            if(game_name === ''){
                                Embed.setFields([
                                    {
                                        "name": "Game",
                                        "value": `*No game name provided.*`,
                                        "inline": true
                                      },
                                      {
                                        "name": "Viewers",
                                        "value": `${viewer_count}`,
                                        "inline": true
                                      }
                                ])
                            }
                            else {
                            Embed.setFields([
                                {
                                    "name": "Game",
                                    "value": `${game_name}`,
                                    "inline": true
                                  },
                                  {
                                    "name": "Viewers",
                                    "value": `${viewer_count}`,
                                    "inline": true
                                  }
                            ])
                        }
                        
                            await msg.edit({ embeds: [Embed] })
        
        
                        }
                        dbdata.save()
                
                    });
            
            
                } else {
        
                    db.findOne({ guildId: config.guildId, twitchuser: streamer}, async (err, dbdata) => {
                        if(err) throw err;
                
                        if(!dbdata) {
                            dbdata = new db({
                                guildId: config.guildId,
                                messageId: 'No message has been sent',
                                twitchuser: streamer,
                                currentlylive: false,
                                messageposted: false
                            })
                    
                        } else {
                            const guild = await client.guilds.fetch(config.guildId)
                            const channel = guild.channels.cache.get(logChannelIDs.socialnotifs)
                            
                            if(dbdata.messageId !== "No message has been sent") {
                                const msg = await channel.messages.fetch(dbdata.messageId)
                                const Embed = msg.embeds[0]
                                Embed.title = "**STREAM OFFLINE**"
                                await msg.edit({ embeds: [Embed] }) 
         
                                   dbdata.messageId = 'No message has been sent'
        
                            }
        
                            
        
        
                            
        
            
                                
                                dbdata.currentlylive = false
                                dbdata.messageposted = false
            
                        }
                        dbdata.save()
                
                    });
            
                }   
            })
        
        })  
    })

  

    setTimeout(checkForLive, 1000 * 60)
    
}

module.exports.function = checkForLive

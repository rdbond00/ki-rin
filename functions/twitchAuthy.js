const auths = require("../Models/auths")
const axios = require('axios')

async function twitchAuthy() {

    auths.findOne({guildId: config.guildId},async (err, authdata) => {

        twitch = Object.assign(authdata)

        const { data: valid_auth_data }  = await axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${twitch.client_id}&client_secret=${twitch.client_secret}&grant_type=refresh_token&refresh_token=${twitch.refresh_token}`
        
            ).catch(function (error){
            console.log(error)
        })

        authdata.access_token = valid_auth_data.access_token
        authdata.expires_in = valid_auth_data.expires_in

        authdata.save()
    })




    setTimeout(twitchAuthy, 7.2e+6)
}

module.exports.function = twitchAuthy
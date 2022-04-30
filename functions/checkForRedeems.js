const axios = require('axios')
const twitchredeems = require("../Models/twitchredeems")
const auths = require("../Models/auths")





async function checkForRedeems() {

    twitchredeems.findOne({id: 'INSERT_REWARD_ID'},async (err, twitchdata) => {

        var axios = require("axios").default;

                var options = {
                method: 'GET',
                url: 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions',
                params: {
                    broadcaster_id: 'INSERT_BROADCASTER_ID',
                    reward_id: 'INSERT_REWARD_ID',
                    status: 'FULFILLED'
                },
                headers: {
                    'Client-Id': 'INSERT_CLIENT_ID',
                    Authorization: 'Bearer INSERT_TOKEN'
                }
                };

                axios.request(options).then(function (response) {
                console.log(response.data);
                }).catch(function (error) {
                console.error(error);
                });

    })
  

    setTimeout(checkForRedeems, 1000 * 60)
    
}

module.exports.function = checkForRedeems

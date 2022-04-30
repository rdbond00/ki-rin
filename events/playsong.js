module.exports = {event: 'playSong',type: 'music'}
module.exports.function = playsong = async (channel, songInfo, requester) => {
    /* See all the 'songInfo' options by logging it.. */

    channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\`.
        This was requested by ${requester.tag} (${requester.id})`
    });
};
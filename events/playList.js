module.exports = {event: 'playList',type: 'music'}
module.exports.function = playlist = async (channel, playlist, songInfo, requester) => {
    /* See all the 'songInfo' and 'playlist' options by logging it.. */

    channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
    });
};
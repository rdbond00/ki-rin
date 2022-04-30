module.exports = {event: 'addSong',type: 'music'}
module.exports.function = addsong = async (channel, songInfo, requester) => {
    /* See all the 'songInfo' options by logging it.. */

    channel.send({
        content: `Added the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` to the queue.
        Added by ${requester.tag} (${requester.id})`
    });
};
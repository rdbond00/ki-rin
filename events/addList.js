module.exports = {event: 'addList',type: 'music'}
module.exports.function = addlist = (channel, playlist, requester) => {
    /* See all the 'playlist' options by logging it.. */

    channel.send({
        content: `Added the playlist [${playlist.title}](${playlist.url}) with ${playlist.videos.length} amount of videos to the queue.
        Added by ${requester.tag} (${requester.id})`
    });
};
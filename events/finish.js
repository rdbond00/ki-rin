module.exports = {event: 'finish',type: 'music'}
module.exports.function = finish = async (channel) => {
    channel.send({
        content: 'Party has been ended!'
    });
};
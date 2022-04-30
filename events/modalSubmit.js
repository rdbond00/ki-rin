const { Formatters } = require('discord.js');
const forms = require("../Models/modals")

module.exports = {event: 'modalSubmit'}
module.exports.function = messagehandler = async (modal) => {

      forms.findOne({guildId: config.guildId,messageId: modal.message.id},async (err, form) => {

        modal.fields.forEach(field => {
          if(field.value===''||field.value===null)return;
          form.Responses.push({'username':modal.user.tag,'CustomId':field.customId,'response':field.value})

          
        });

        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: 'Thanks for responding.', ephemeral: true })
        form.save()

      })

}
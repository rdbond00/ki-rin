const modalsdb = require("../Models/modals")
global.modal_count = 0

async function ModalInitiation() {

    modalsdb.find({guildId:config.guildId},async (err, modals) => {

        modals.forEach(async modal => {

            modal.Initiated = false

        })
        modal_count = modals.length
        modalsdb.bulkSave(modals)

    })
}

module.exports.function = ModalInitiation
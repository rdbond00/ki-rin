// Called every time a message comes in
const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
const modalsdb = require("../Models/modals")

const modal = new Modal

async function buttonhandler (interaction) {

if (!interaction.isButton()) return;

if (interaction.message.reference === null){

if(interaction.customId === 'show_form'){

    modalsdb.findOne({guildId: config.guildId,messageId: interaction.message.id},async (err, modaldata) => {
        if(err) throw err;
        if(!modaldata)return;

        if(modaldata.Initiated === false){
            modal.setCustomId(modaldata.customId)
            modal.setTitle(modaldata.title)

            modaldata.TextInputs.forEach((input,x) => {

                eval('global.CustomId' + (x+1) + '= ' + 'input.CustomId')
                eval('global.Label' + (x+1) + '= ' + 'input.Label')
                eval('global.Style' + (x+1) + '= ' + 'input.Style')
                eval('global.MinLength' + (x+1) + '= ' + 'input.MinLength')
                eval('global.MaxLength' + (x+1) + '= ' + 'input.MaxLength')
                eval('global.Placeholder' + (x+1) + '= ' + 'input.Placeholder')
                eval('global.Required' + (x+1) + '= ' + 'input.Required')
                eval('global.input' + (x+1) + '= ' + 'new TextInputComponent()')

                eval('input'+(x+1)+'.setCustomId(CustomId'+(x+1)+')')
                eval('input'+(x+1)+'.setLabel(Label'+(x+1)+')')
                eval('input'+(x+1)+'.setStyle(Style'+(x+1)+')')
                eval('input'+(x+1)+'.setMinLength(MinLength'+(x+1)+')')
                eval('input'+(x+1)+'.setMaxLength(MaxLength'+(x+1)+')')
                eval('input'+(x+1)+'.setPlaceholder(Placeholder'+(x+1)+')')
                eval('input'+(x+1)+'.setRequired(Required'+(x+1)+')')

            })
            
            if(modaldata.TextInputs.length === 1){
                modal.setComponents(input1);
            } else if(modaldata.TextInputs.length === 2){
                modal.setComponents(input1,input2);
            } else if(modaldata.TextInputs.length === 3){
                modal.setComponents(input1,input2,input3);
            } else if(modaldata.TextInputs.length === 4){
                modal.setComponents(input1,input2,input3,input4);
            }


            modaldata.Initiated = true
                showModal(modal, {
                    client: client, // Client to show the Modal through the Discord API.
                    interaction: interaction // Show the modal with interaction data.
                }).catch(error => {
                    if(error instanceof TypeError){

                    }else{
                        console.log(error)
                    }
                })
        } else{
            showModal(modal, {
                client: client, // Client to show the Modal through the Discord API.
                interaction: interaction // Show the modal with interaction data.
            }).catch(error => {
                if(error instanceof TypeError){

                }else{
                    console.log(error)
                }
            })

        }

        modaldata.save()


    })





} else if(interaction.customId.includes('button')) {
    //Polls
    const pollsdb = require("../Models/polls")
    const channel = client.channels.cache.get(interaction.message.channel.id)
    const msg = await channel.messages.fetch(interaction.message.id)
    const Embed = interaction.message.embeds[0]

    pollsdb.findOne({ guildId: config.guildId, pollId: interaction.message.id, currentlyActive: true}, async (err, dbdata) => {
        
        if(err) throw err;
        
        if(!dbdata){
            interaction.reply({ content: `This poll has already ended.`, ephemeral: true })
            return
        }

        const poll_Participant = interaction.user.id

        if(dbdata.pollParticipants.includes(poll_Participant)){
            interaction.reply({ content: `You've already voted on this poll.`, ephemeral: true })
            return
        }

        const buttonNum = interaction.customId.replace('button','')

        var rowNum = 0
        var buttonPos = 0

        if(buttonNum >= 0 && buttonNum <= 4){
            buttonPos = buttonNum
        } else if(buttonNum >= 5 && buttonNum <= 9){
            rowNum = 1
            buttonPos = buttonNum - 5 
        } else if(buttonNum >= 10 && buttonNum <= 14){
            rowNum = 2 
            buttonPos = buttonNum - 10 
        } else if(buttonNum >= 15 && buttonNum <= 19){
            rowNum = 3 
            buttonPos = buttonNum - 15 
        } else if(buttonNum >= 20 && buttonNum <= 24){
            rowNum = 4 
            buttonPos = buttonNum - 20
        }


        const userChoice = interaction.message.components[rowNum].components[buttonPos].label

        dbdata.pollParticipants.push(poll_Participant)
        dbdata.pollResults.push(userChoice)

        for (x = 0; x < Embed.fields.length; x++) {

            const currentName = Embed.fields[x].name

            const choicePercent = dbdata.pollResults.filter(result => result === dbdata.pollChoices[x]).length/dbdata.pollResults.length*100
            
            var loadingBar = "░░░░░░░░░░░░░░░░░░░░░░░░░"

            if(choicePercent > 0 && choicePercent <= 5){
                loadingBar = "█░░░░░░░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 5 && choicePercent <= 10){
                loadingBar = "██░░░░░░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 10 && choicePercent <= 15){
                loadingBar = "███░░░░░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 15 && choicePercent <= 20){
                loadingBar = "█████░░░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 20 && choicePercent <= 25){
                loadingBar = "██████░░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 25 && choicePercent <= 30){
                loadingBar = "███████░░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 30 && choicePercent <= 35){
                loadingBar = "████████░░░░░░░░░░░░░░░░░"
            } else if(choicePercent > 35 && choicePercent <= 40){
                loadingBar = "██████████░░░░░░░░░░░░░░░"
            } else if(choicePercent > 40 && choicePercent <= 45){
                loadingBar = "███████████░░░░░░░░░░░░░░"
            } else if(choicePercent > 45 && choicePercent <= 50){
                loadingBar = "████████████░░░░░░░░░░░░░"
            } else if(choicePercent > 50 && choicePercent <= 55){
                loadingBar = "█████████████░░░░░░░░░░░░"
            } else if(choicePercent > 55 && choicePercent <= 60){
                loadingBar = "███████████████░░░░░░░░░░"
            } else if(choicePercent > 60 && choicePercent <= 65){
                loadingBar = "████████████████░░░░░░░░░"
            } else if(choicePercent > 65 && choicePercent <= 70){
                loadingBar = "█████████████████░░░░░░░░"
            } else if(choicePercent > 70 && choicePercent <= 75){
                loadingBar = "██████████████████░░░░░░░"
            } else if(choicePercent > 75 && choicePercent <= 80){
                loadingBar = "████████████████████░░░░░"
            } else if(choicePercent > 80 && choicePercent <= 85){
                loadingBar = "█████████████████████░░░░"
            } else if(choicePercent > 85 && choicePercent <= 90){
                loadingBar = "██████████████████████░░░"
            } else if(choicePercent > 90 && choicePercent <= 95){
                loadingBar = "███████████████████████░░"
            } else if(choicePercent > 95 && choicePercent <= 99){
                loadingBar = "████████████████████████▓"
            } else if(choicePercent === 100){
                loadingBar = "█████████████████████████"
            }
                if(currentName.includes('(')&&currentName.includes(')')){
                    Embed.fields[x].name = `${currentName.slice(0,currentName.indexOf('('))} (${dbdata.pollResults.filter(result => result === dbdata.pollChoices[x]).length} votes)`
                } else{
                    Embed.fields[x].name = `${currentName} (${dbdata.pollResults.filter(result => result === dbdata.pollChoices[x]).length} votes)`
                }

                Embed.fields[x].value = `${loadingBar} (${choicePercent}%)`

        }

        await msg.edit({ embeds: [Embed] }) 

        interaction.reply({ content: `Your choice has been saved. Thanks for participating!`, ephemeral: true })

        dbdata.save()
    })



    }
} else {
//Let's go ahead and setup author as a string variable
var author = ''
var Perms = ['everyone']

//We want to wait to fetch the referenced message from the interaction
await interaction.channel.messages.fetch(interaction.message.reference.messageId).then( referencedMessage => {

  //Now lets store the referenced messages author in our variable
  author = referencedMessage.author
})

//If the user who is clicking the button is not the one who originally ran the command... IGNORE
if(interaction.user.id !== author.id && !interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: 'Only the user who originally ran the !help command can do that.', ephemeral: true});
if(interaction.member.permissions.has('ADMINISTRATOR')){
        Perms.push('moderator')
    }

const embedDesc = interaction.message.embeds[0].description
const availableCommands = client.basiccommands.filter(c => c.reqPerms.some(element => Perms.some(e => e === element)))

var commandlist = Array.from(availableCommands.keys())

var x = commandlist.findIndex(c => c === embedDesc.slice(6,embedDesc.indexOf('\n')))

    var command = Array.from(availableCommands.values()).find((e,index) => index === x)


    var Embed = new MessageEmbed()
    .setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('back')
            .setLabel('back')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('next')
            .setLabel('next')
            .setStyle('SUCCESS'),
            new MessageButton()
            .setCustomId('exit')
            .setLabel('exit')
            .setStyle('DANGER'),
    );

    if (interaction.customId === 'back') {
    if(x === 0){
        x = availableCommands.size - 1
        command = Array.from(availableCommands.values()).find((e,index) => index === x)
        Embed.setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)
                interaction.update({ embeds: [Embed], components: [row] })
    return
    }
    x -= 1
    command = Array.from(availableCommands.values()).find((e,index) => index === x)
    Embed.setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)
                interaction.update({ embeds: [Embed], components: [row] })
        }
    if  (interaction.customId === 'next') {
        if(x === availableCommands.size - 1){
        x = 0
        command = Array.from(availableCommands.values()).find((e,index) => index === x)
        Embed.setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)
                    interaction.update({ embeds: [Embed], components: [row] })
        return
        }
    x += 1
    command = Array.from(availableCommands.values()).find((e,index) => index === x)
    Embed.setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)
                interaction.update({ embeds: [Embed], components: [row] })
            }
    if  (interaction.customId === 'exit') {
                interaction.message.delete()
            }
        }
}

module.exports = buttonhandler
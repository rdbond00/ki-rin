function automod (message) { // Function with 'message' parameter

    if (message.author.bot) return;
    if (!message.member) return;
    if (message.member.permissions.has('ADMINISTRATOR')) return;
    
    
          if (message.content.toLowerCase().includes('https://discord.gg')) {
              message.delete()
              }
    }

    module.exports = automod
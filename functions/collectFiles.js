function collectFiles () {
    //Create a Basic commands collection and read from the available list of commands and add them to the collection
    client.basiccommands = new Collection();
    const basiccommandFiles = fs.readdirSync('./commands/Basic/').filter(file => file.endsWith('.js'));
    for (const file of basiccommandFiles) {
        const basiccommand = require(`../commands/Basic/${file}`);
        client.basiccommands.set(basiccommand.name, basiccommand);
    }

    //Create a Slash commands collection and read from the available list of commands and add them to the collection
    client.slashcommands = new Collection();
    const slashcommandFiles = fs.readdirSync('./commands/Slash/').filter(file => file.endsWith('.js'));
    for (const file of slashcommandFiles) {
        const slashcommand = require(`../commands/Slash/${file}`);
        client.slashcommands.set(slashcommand.data.name, slashcommand);
    }

    //Create a handlers collection and read from the available list of handlers and add them to the collection
    const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
    client.handlers = new Collection();
    for (const file of handlerFiles) {
        const handler = require(`../handlers/${file}`);
        client.handlers.set(file.slice(0,-10), handler);
    }
    
    //Create a functions collection and read from the available list of functions and add them to the collection
    const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('.js'));
    client.functions = new Collection();
    for (const file of functionFiles) {
        const functionfile = require(`../functions/${file}`);
        client.functions.set(file.slice(0,-3), functionfile);
    }
    
}

module.exports.function = collectFiles
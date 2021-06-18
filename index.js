const Discord = require("discord.js");
const client = new Discord.Client();
const WOKCommands = require('wokcommands');
const mongo = require("./mongo")
const mongoose = require('mongoose')
require('dotenv').config()

// Hopefully REPL Stuff
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// End of REPL stuff

botVersion = "1.0.0"
mode = "normal"
module.exports = botVersion, mode

client.on('ready', async () => {
    console.log('ready')
    mongoose.set('useFindAndModify', false);
    client.user.setActivity("S.A.M.! stonks?setup", { type: "PLAYING"});
    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features'
    }).setDefaultPrefix('stonks?').setMongoPath(process.env['mongoPath'])

    await mongo().then(mongoose => {
        try{
            console.log("Connected to mongo!")
        }
        finally{
            mongoose.connection.close()
        }
    })
})

if(mode == "testing"){
    const config = require("./config.json")
    client.login(config.testToken);
} else {
    client.login(process.env.token)
}
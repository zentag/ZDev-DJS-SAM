const sussyuwu = require('../activity')
const mongo = require('../mongo')
const generalSchema = require('../schemas/generalSchema')
const profileSchema = require('../schemas/guildSchema')

module.exports = async (client) => {
    setInterval(() => {
        
        const result = generalSchema.findOne({id: "poo" }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                for (var i = 0; i < docs.guilds.length; i++) {
                    var guild = docs.guilds[i];
                    sussyuwu.addActivity(guild, client)
                    console.log(`Activity added in ${guild}, uwu!`)
                }
            }
        });
        
        
        
    }, 600000)
}
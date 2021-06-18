const mongo = require('./mongo')
const profileSchema = require('./schemas/guildSchema')

const addActivity = async (guildId, client) => {
  await mongo().then(async (mongoose) => {
    try {
      const result0 = profileSchema.findOne(
        {guildId},
        function (err, docs){
          if (err){
            console.log(err)
          }
          else{
            const { activity, time, unconfactivity, messageOn, messageContent } = docs
            const activityrate = (activity / time) * 60;
            const newactivityrate = ((unconfactivity + activity) / (time + 10)) * 60;
            if(newactivityrate > activityrate && messageOn == true){
              let guild = client.guilds.cache.get(guildId)
              let channelID;
              let channels = guild.channels.cache;

              channelLoop:
              for (let key in channels) {
                let c = channels[key];
                if (c[1].type === "text") {
                  channelID = c[0];
                  break channelLoop;
                }
              }

              let channel = guild.channels.cache.get(docs.messageChannel || guild.systemChannelID || channelID);
              channel.send(messageContent || "Poggers, your activity rate is above normal!")
            }
          }
        }
      )
      const result1 = await profileSchema.findOneAndUpdate(
        {
          guildId
        },
        {
          guildId,
          $inc: {
            time: 10,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
      let { unconfactivity } = result1
      const result2 = await profileSchema.findOneAndUpdate(
        {
          guildId
        },
        {
          guildId,
          $inc: {
            activity: unconfactivity,
          },
          $set: {
              unconfactivity: 0,
          }
        },
        {
          upsert: true,
          new: true,
        }
      )
      

    } finally {
      console.log("hell ya, mongo succeed")
    }
  })
}

module.exports.addActivity = addActivity
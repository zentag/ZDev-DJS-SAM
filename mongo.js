const mongoose = require('mongoose')
require('dotenv').config()


module.exports = async () => {
    await mongoose.connect(process.env['mongoPath'], { useUnifiedTopology: true, useNewUrlParser: true } )
    return mongoose
}
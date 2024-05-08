const mongoose = require("mongoose")

const connectDB = ()=>{
    return mongoose.connect(process.env.URISINGLE)
}

module.exports = connectDB
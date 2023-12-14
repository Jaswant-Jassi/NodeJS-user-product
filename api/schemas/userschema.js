const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profile_pic: { type: String, default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png" },
    joining: { type: Date, default: Date.now },
    role: {type: String, default:"user"}

})

const user = model('user', userSchema)
module.exports = user  
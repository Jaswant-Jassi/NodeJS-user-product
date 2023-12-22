const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    image: {
        type: String, required: true, default: "data:https://icons8.com/icon/115643/unavailable"
    },
    productname: {
        type: String, required: true, unique: true
    },
    author: {
        type: String, required: true 
    },
    price: {
        type: Number, required: true
    },
    category: {
        type: String, required: true
    },
    publisher: {
        type: String, required: true
    },

})

const product = model('product', productSchema)
module.exports = product







 





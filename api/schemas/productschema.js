const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productname: {
        type: String, required: true, unique: true
    },
    price: {
        type: Number, required: true
    },
    images: {
        type: String, required: true, default: "data:https://icons8.com/icon/115643/unavailable"
    },
    brand: {
        type: String, required: true 
    },
    category: {
        type: String, required: true
    },


})

const product = model('product', productSchema)
module.exports = product







 





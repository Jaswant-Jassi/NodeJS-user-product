const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    images: {
        type: String, required: true , default: "data:https://icons8.com/icon/115643/unavailable"
    },
    
    price: {
        type: Number, required: true
    },
    productname: {
        type: String, required: true, unique: true
    },
    author: {
        type: String, required: true 
    },
    category: {
        type: String, required: true
    },
    publisher: {
        type: String, required: true 
    },
    publicationyear: {
        type: Number, required: true 
    },


})

const product = model('product', productSchema)
module.exports = product







 





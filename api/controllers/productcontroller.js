require('dotenv').config()
const { connect } = require('mongoose')
const productSchema = require('../schemas/productschema')

const allProducts = async (req, res) => {

  try {
    const db = await connect(process.env.MONGO_URI)
    const allProducts = await productSchema.find()
    res.status(201).json({ message: allProducts })
  } 
  catch (error) {
    res.status(400).json({})
  } 
}

const productByID = async (req, res) => {
  // res.send("Hello productByID")
  const {id}= req.params;

  try {
    const db = await connect(process.env.MONGO_URI)
    const product = await productSchema.findOne({ _id:id })
    res.json({ product })
  }
  catch (error) {
    res.status(400).json({ message: "product is not available" })
  }
}

const createProduct = async (req, res) => {
  
  const {image, price, productname, author, category, publisher, publicationyear } = req.body;

    if (image && price && productname && author && category && publisher && publicationyear) {
        try {
            await connect(process.env.MONGO_URI)
            const checkProduct = await productSchema.exists({ productname })
            if (!checkProduct) {
                await productSchema.create({image, price, productname, author, category, publisher, publicationyear})
                res.status(201).json({ message: "Product Created Successfully" })
            }

            else {
                res.json({
                    message: "Product already Exists"
                })
            }
        } 

        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    else {
        res.status(403).json({
            message: "Required Field Missing"
        })
    }

}

const updateProduct = async (req, res) => {
 
  const {productname, price} = req.body;
  try {
    const filter = {productname}
    const update = {price}
    const db = await connect(process.env.MONGO_URI)
    const doc = await productSchema.findOneAndUpdate(filter, update, {
      new: true
    })
    res.json({ message: "Product updated successfully."})
  }
  catch (error) {
    res.status(400).json({ message: error.message})
  }
}

// const deleteProduct = async (req, res) => {
  
//   try {
//     const db = await connect(process.env.MONGO_URI)
//     const deleteProduct = await productSchema.findOneAndDelete({productname: req.body.productname})
//     const updatedProducts = await productSchema.find()
    
//     res.json({
//       message: "The product deleted successfully.",
//       products: updatedProducts
//     })
//   }
//   catch (error) {
//     res.status(400).json({ message: error.message})
//   }

// }

const deleteProduct = async (req, res) => {
  
  const {productname} = req.body
  const db = connect(process.env.MONGO_URI)
  const checkProduct = await productSchema.findOne({productname})

  if (checkProduct) {
    const deleteProduct = await productSchema.findOneAndDelete({productname: req.body.productname})
    const updatedProducts = await productSchema.find()
    res.json({
      message:"Product deleted successfully",
      remaining_products: updatedProducts})
  }
  else {
    const updatedProducts = await productSchema.find()
    res.json({message:"Product not Exist",  existing_products: updatedProducts})
  }

}

module.exports = { allProducts, productByID, createProduct, updateProduct, deleteProduct }

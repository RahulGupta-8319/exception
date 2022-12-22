const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    qty:String,
    price:String,
    date:Date,
    image:String
    
},{timestamps:true})

module.exports = mongoose.model('Product', productSchema)
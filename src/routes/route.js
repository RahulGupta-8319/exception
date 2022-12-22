const express = require('express')
const Router = express.Router()

const productController = require('../controller/productController')

Router.get('/ping' ,(req,res)=>{
     res.send("pong")
    })

Router.post('/product', productController.createProduct)
Router.get('/getproducts' , productController.getAllProduct)
Router.get('/getProduct', productController.getProductWithFilter)


module.exports = Router

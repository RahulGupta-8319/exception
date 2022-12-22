const productModel = require('../model/productModel')
const moment = require('moment')
const {uploadFile} = require('../controller/aws')

const isEmpty = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };


let qtyRegex = /^[0-9]+$/
let priceRegex = /^[0-9.]+$/



const createProduct = async (req,res)=>{
    try {
        let data = req.body

        let files = req.files

        let {title, description , qty, price, date} = data

        if(files && files.length >0){
            let img = await uploadFile(files[0])
            data.image = img
        }else{
            return res.status(400).send({status:false, message:"please provide image of product"})
        }

        if(!isEmpty(title)) return res.status(400).send({status:false, message:"Enter the title name"})      

        if(!isEmpty(description)) return res.status(400).send({status:false, message:"write some description"})      
        if(description.length > 250) return res.status(400).send({status:false, message:"You have exceeded the maximum character limit"})

        if(!isEmpty(qty)) return res.status(400).send({status:false, message:"qty is required"})
        if(!qtyRegex.test(qty)) return res.status(400).send({status:false, message:"qty should be in Numerical Form"})

        if(!isEmpty(price)) return res.status(400).send({status:false, message:"Enter the product price"})
        if(!priceRegex.test(price)) return res.status(400).send({status:false, message:"price should be in Numerical Form"})

        if(!isEmpty(date)) return res.status(400).send({status:false, message:"Write the current data"})
        if (!(moment(date, 'YYYY-MM-DD', true).isValid())) {
            return res.status(400).send({ status: false, message: "invalid date format please provide date format Like YYYY-MM-DD" })
        }
 
        const productCreated = await productModel.create(data)

        res.status(201).send({status:true, data:productCreated})      
        
    } catch (error) {
        res.status(500).send({status:false, message:error.message})      
    }
}

const getAllProduct = async (req,res) => {
    try {
        let page = req.query.page
        console.log(page);
        const products= await productModel.find().limit(5).skip(5*page)

        res.status(200).send({status:true, data:products})      
    } catch (error) {
        res.status(500).send({status:false, message:error.message})      
    }
}

const getProductWithFilter = async (req,res) => {
    try {

        let data = req.query

        let {title, startingDate, endingDate } = data    

        let filter = { }

        if(title){
            filter.title = {}
            filter.title['$regex'] = title
        }
        if(startingDate && !endingDate){
            if (!(moment(startingDate, 'YYYY-MM-DD', true).isValid())) {
                return res.status(400).send({ status: false, message: "invalid date format please provide date format Like YYYY-MM-DD" })
            }
            let sTimestamp = new Date(startingDate).getTime()
            filter.date = {$gte : sTimestamp }

        }
        if(endingDate && !startingDate){
            if (!(moment(endingDate, 'YYYY-MM-DD', true).isValid())) {
                return res.status(400).send({ status: false, message: "invalid date format please provide date format Like YYYY-MM-DD" })
            }
            let eTimestamp = new Date(endingDate).getTime()
            filter.date = {$lte: eTimestamp }
        }
        if(startingDate && endingDate){
            if (!(moment(startingDate, 'YYYY-MM-DD', true).isValid()) || !(moment(endingDate, 'YYYY-MM-DD', true).isValid())) {
                return res.status(400).send({ status: false, message: "invalid date format please provide date format Like YYYY-MM-DD" })
            }
            let sTimestamp = new Date(startingDate).getTime()
            let eTimestamp = new Date(endingDate).getTime()
            filter.date = {$gte : sTimestamp , $lte :eTimestamp }
        }
           console.log(filter);
        const allProducts = await productModel.find(filter)

        res.status(200).send({status:true, data:allProducts})
           
    } catch (error) {
        res.status(500).send({status:false, message:error.message})      
    }
}


module.exports ={createProduct, getAllProduct, getProductWithFilter }
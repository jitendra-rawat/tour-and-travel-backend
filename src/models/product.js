import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },


    price:{
        type:Number,
        require:true
    },

    description:{
        type:String,
        require:true
    },



})


const Product = mongoose.model("Product", productSchema)



export default Product;
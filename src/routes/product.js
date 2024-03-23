import express from 'express'
import Product from '../models/product.js'

const router = express.Router();


router.post('/add-product', async (req, res) => {
    try {
      const { title, price, description } = req.body;
      const newProduct = new Product({ title, price, description });
      await newProduct.save();
      
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to add product",
        error: error.message
      });
    }
  });
  


  router.get('/all-product', async(req,res) => {

    try {
        const products = await Product.find()

        res.status(201).json({
            success:true,
            message:"All the Products got successfully",
            products
        })
    } catch (error) {

        res.status(201).json({
            success:false,
            message:"failed to get products",
            error: error.message
           
        })
        
    }

  })


  router.get('/all-product/:id', async (req,res) => {

    const {id} = req.params;

    const product = await Product.findById(id)

    res.status(201).json({
        success:true,
        message:"Got the Product",
        product
    })

  })


  router.patch('/update/:id', async(req,res) => {

    const {id} =req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body,{new:true}  )

    res.status(201).json({
        success:true,
        message:"Product updated sucessfully",
        updatedProduct
    })
  })



  router.delete('/delete/:id', async(req,res) => {
    const {id} = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id)


    res.status(201).json({
        success:true,
        message:"Product deleted successfully",
        deletedProduct
    })
  })



export default router
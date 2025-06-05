import express from 'express'
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import authRoutes from './src/routes/auth.js'
import tourRoutes from './src/routes/tour.js'
import messageRoutes from './src/routes/message.js'
import bookingRoutes from './src/routes/booking.js'
import blogRoutes from './src/routes/blog.js'
import cors from 'cors'

import productRoutes from './src/routes/product.js'




const PORT =  4000;
const app = express();
configDotenv(); 

const corsOptions = {
  origin: 'https://busybootstravel.netlify.app',
  methods: ['GET', 'POST','PATCH','PUT','DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));



//connect db
mongoose.connect('mongodb+srv://jitendrasingh:jitendrasingh@cluster0.xygxhgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then( () => console.log("DB Connected")).catch( (err) => console.log(err) )




//middlewares

app.use(express.json());




//routes

app.use('/auth', authRoutes);

app.use('/tour',tourRoutes)

app.use('/message',messageRoutes)

app.use('/booking',bookingRoutes)

app.use('/blog',blogRoutes)


app.use('/product', productRoutes)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

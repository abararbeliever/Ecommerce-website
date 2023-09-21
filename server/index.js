import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/routeAuth.js';
import morgan from 'morgan';
import cors from 'cors';
import newrouter from  './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js'
//env
dotenv.config();

const app=express();
const PORT=process.env.PORT || 8080;
const DB=process.env.DB;

// Default parser from express instead of body parser
app.use(express.json());

//For Api calls
app.use(morgan("dev"));
app.use(cors());
app.use('/api/auth',router)
app.use('/api/category',newrouter) 
app.use('/api/product',productRoute)

app.get('/',(req,res)=>{
    res.send('welcome')
})

mongoose.connect('mongodb+srv://mohdab:wGaQcVV6@cluster0.11i9xca.mongodb.net/Ecommerce',console.log('data base connected'))
.then(()=>{
    app.listen(8080,console.log('Listening on port 8080'))
})
.catch((error)=>{
    console.log(error);
})





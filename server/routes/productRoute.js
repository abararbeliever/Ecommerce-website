import express from 'express';
import {requiresignin,isAdmin} from '../middleware/middelwareAuth.js';
import formidable from 'express-formidable'
import { createproduct,getallproduct,getsingleproduct,getphoto,deleteproduct,updateproduct } from '../controller/productcontroller.js';

const router=express.Router();

//create product
router.post('/create-product', requiresignin,isAdmin,formidable(),createproduct)


//get all products
router.get('/get-product',getallproduct);

//get single products
router.get('/get-product/:slug',getsingleproduct);

//Get photo
router.get('/product-photo/:pid',getphoto)

//Delete product
router.delete("/delete-product/:pid",deleteproduct)

//Update product
router.put("/update-product/:pid", requiresignin,isAdmin,formidable(),updateproduct)

export default router
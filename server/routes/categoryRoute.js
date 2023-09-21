import express from 'express'
import { createcategory,updatecategory,getcategory,getsinglecategory, deletecategory } from '../controller/categorycontroller.js';

import {requiresignin,  isAdmin } from '../middleware/middelwareAuth.js'

const newrouter=express.Router();

//create category
newrouter.post('/create-category',requiresignin,isAdmin,createcategory);

//update category
newrouter.put('/update-category/:id',requiresignin,isAdmin,updatecategory);


//Get All Category
newrouter.get("/get-category",getcategory)

//Get Single Category
newrouter.get("/single-category/:slug",getsinglecategory)

//Delete category
newrouter.delete("/delete-category/:id",requiresignin,isAdmin,deletecategory)

export default newrouter;
import express from 'express';
import categoryModel from "../model/categoryModel.js";
import slugify from 'slugify'

//create category
export const createcategory=async(req,res)=>{
try {
    const {name}=req.body; 
    if(!name){  
       return  res.status(200).send({message:'enter the category name'})
    }
    const findname=await categoryModel.findOne({name});
    if(findname){
        return res.status(200).send({message:'name already exist'})
    }
   
    const createname= await categoryModel({name,slug:slugify(name)}).save();
    res.status(201).send({success:true,message:'saved',createname})
} catch (error) {
    res.status(500).send({succes:false,message:'error in category',error},console.log(error))
}
}


//Update Category Controller
export const updatecategory=async(req,res)=>{
try {
    const {name}=req.body;
    const  {id}=req.params;
    const updatename=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({message:'category updated',updatename})
    
} catch (error) {
    console.log(error);
    res.status(500).send(error,"internal error ")
}
}


//Get All Category Controller
export const getcategory=async(req,res)=>{ 
    try {
        const getcat = await categoryModel.find({});
        res.status(200).send({success:true,message:'category list',getcat})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Get category controller error",error})
    }
}

//Get single category
export const getsinglecategory=async(req,res)=>{
    try {
        const getsingle = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({message:"single category",getsingle})       
    } catch (error) {
        console.log(error);
        res.status(500).send({succes:false,message:'error while getting single category',error})
    }
}

//Delete Category
export const deletecategory=async(req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({succes:true,message:"categort deleted"})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error while deleting category",error})
    }
}
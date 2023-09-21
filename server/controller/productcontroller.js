import slugify from 'slugify';
import productModel from '../model/productModel.js'
import fs from 'fs'
import { pid } from 'process';
export const createproduct=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
    const {photo}=req.files;
    switch (true) {
        case !name:return res.status(200).send({message:'name required'})
            break;
            break;
            case !description:return res.status(200).send({message:'name required'})
            break;
            case !price:return res.status(200).send({message:'price required'})
            break;
            case !category:return res.status(200).send({message:'category required'})
            break;
            case !quantity:return res.status(200).send({message:'quantity required'})
            break;
            case photo && photo.size > 100000000000 :return res.status(200).send({message:' image size must be less than 1 mb'})
            break;
    }

    const product = new productModel({...req.fields,slug:slugify(name)});
    if(photo)
    {
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.ContentType=photo.type;
    }
    await product.save();
    res.status(201).send({success:true,message:"product detail successfully entered"})

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error})
        
    }
    
}

//getall products controller
export const getallproduct=async(req,res)=>{

    try {
        
       const product= await productModel.find({}).populate("category" ).select("-photo").limit(12).sort({createdAt:-1});
       res.status(200).send({
                product,message:"all products","no of products":product.length,
        })

    } catch (error) {
        console.log(error)
    }
}

//Get single product
export const getsingleproduct=async(req,res)=>{
try {
     const {slug}=req.params;
       const product= await productModel.findOne({slug:slug}).select("-photo");
       res.status(200).send({product,message:"product details"})
} catch (error) {
    console.log(error);
    res.status(500).send({message:"error while getting single product"});
}
}

//Get Photo
export const getphoto=async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.ContentType);
            return res.status(200).send(product.photo.data)
        }
    res.status(200).send(product) 
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error while retrieving photo"})
    }
}


//Delete product controller
export const deleteproduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send("item deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error while deleting product"})
    }
}

//Update product
export const updateproduct=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        switch (true) {
            case !name:return res.status(500).send({message:'name required'})
                break;
                break;
                case !description:return res.status(500).send({message:'name required'})
                break;
                case !price:return res.status(500).send({message:'price required'})
                break;
                case !category:return res.status(500).send({message:'category required'})
                break;
                case !quantity:return res.status(500).send({message:'quantity required'})
                break;
                case photo && photo.size > 100000000000 :return res.status(500).send({message:' image size must be less than 1 mb'})
                break;
        }
    
        const product =  await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
        if(photo)
        {
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.ContentType=photo.type;
        }
        await product.save();
        res.status(201).send({message:"product detail successfully entered"})
            
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error while updating product"})       
    }
}

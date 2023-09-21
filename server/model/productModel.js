import mongoose from "mongoose";

const Createproduct = new mongoose.Schema({

        name:{
            type:String,
            required:true,
        },
        slug:{
            type:String,
            required:true, 
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:String,
            required:true,
        },
        category:{
            type:mongoose.ObjectId,
            ref:"category",
            required: true,
        },
        quantity:{
            type:Number,
            required:true
        },
        photo:{
            data:Buffer,
            ContentType:String
        },
        shipping:{
            type:Boolean
        }


},{timestamps:true})

export default mongoose.model('products',Createproduct)
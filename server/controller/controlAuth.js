import express from 'express';
import { comparepwd, hashedpwd } from '../helper/helperAuth.js';
import authSchema from '../model/modelAuth.js';
import JWT from 'jsonwebtoken';

//register callback function
export const registerAuth = async (req, res) => {
    try {


        const { name, password, email, address, answer } = req.body;

        if (!name) {
            return res.send({success:'name is required'})
        }
        if (!password) {
            return res.send({success:'password is required'})
        }
        if (!email) {
            return res.send({success:'email is required'}) 
        }
        if (!address) {
            return res.send({success:'address is required'})
        }
        if (!answer) {
            return res.send({success:'answer is required'})
        }

        const checkmail = await authSchema.findOne({ email });

        if (checkmail) {
            return res.status(200).send({email:'email is already registered, please login'});
        }
        const hashing = await hashedpwd(password);
        const registerdata = await new authSchema({ name, email, address, answer, password: hashing }).save();
        res.status(201).send({message:"saved"})
    } catch (error) {
        res.status(500).send(error)
    }

}



export const loginAuth= async (req,res)=>{
 try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(200).send({message:"Please enter all credentials"})
        }

        const user = await authSchema.findOne({email});
        if(!user)
        {
            return res.status(200).send({message:"Email is not registered"})
        }
        const  match=await comparepwd(password,user.password);
        if(!match){
            return res.status(200).send({message:" Please enter the valid credentials"})
        }

        const token=JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.status(200).send({
            success:"true",
            message:"login successful",
            user:{
                name:user.name,
                email:user.email,
                address:user.address,
                role:user.role
            },
            token
        })

 } catch (error) {
    return res.status(500).send({
        success:"False",
        message:"Login Failed"
    })
 }

}


export const tester=(req,res)=>{
res.status(200).send("protected route")
}


export const reset=async(req,res)=>{
        
        try {
            const {email,answer,password} =req.body;
        if(!email) return res.status(400).send("enter a email");
        if(!answer) return res.status(400).send("enter answer");
        if(!password) return res.status(400).send("enter new password");
        const checkuser = await authSchema.findOne({email,answer});
        if(!checkuser)
        {
            return res.status(201).send("no valid credentials");
        }    
        
        const cmp=await comparepwd(password,checkuser.password)
        if(cmp)
        {
            return res.status(400).send('enter updated password')
        }
        const hashed=await hashedpwd(password);
         await authSchema.findByIdAndUpdate(checkuser._id,{password:hashed}) 
        res.status(200).send(
            {success:"true",message:'new password updated'}
        )
            
        } catch (error) {
            res.status(500).send({message:"error"},console.log(error))
        }
        
}
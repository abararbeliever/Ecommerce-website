import express from 'express';
import { hashedpwd } from '../helper/helperAuth.js';
import authSchema from '../model/modelAuth.js';
import { registerAuth, loginAuth,reset } from '../controller/controlAuth.js';
import { tester } from '../controller/controlAuth.js';
import { isAdmin, requiresignin } from '../middleware/middelwareAuth.js';

// router object
const router=express.Router();


// Register || POST method
router.post('/register',registerAuth)

// Login || POST method
router.post('/login',loginAuth)

// // Test || get method
router.get('/test',requiresignin,isAdmin,tester);

//user panel route
router.get('/auth-user',requiresignin,(req,res)=>{
    return res.status(200).send({ok:true})
})

//admin panel route
router.get('/auth-admin',requiresignin,isAdmin,(req,res)=>{
    return res.status(200).send({ok:true})
})

//forgot password or reset
router.post('/reset',reset)

export default router;
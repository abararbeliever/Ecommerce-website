import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Stack, TextField, Typography } from '@mui/material'
import {toast} from 'react-toastify';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth'

const Login = () => {
const [formdata,setFormdata]=useState({email:'',password:''});
const [auth,setAuth]=useAuth();

const navigate=useNavigate();
const location=useLocation();
const submithandle=async(e)=>{
    try {
      e.preventDefault();
      const postdata=await axios.post(`${process.env.REACT_APP_API}/api/auth/login`,formdata);
      if(postdata.data.success){
        toast.success(postdata.data.message);
        setAuth({...auth, 
          user:postdata.data.user,
          token:postdata.data.token})
         localStorage.setItem('auth',JSON.stringify(postdata.data)) 
         navigate( '/')
      }
      else{
        toast.warning(postdata.data.message);
      }
      
    } catch (error) {
        toast.error(error)
    }
}

  return (
    <Layout>
            <form onSubmit={submithandle} style={{width:'500px', margin:'0px auto'}}>
                <Stack spacing={4} direction={'column'} pt={5} textAlign={'center'}>
                    <Typography variant='h4' color={'GrayText'}>
                        LOGIN FORM
                    </Typography>
                    <TextField label='Email'  value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})} helperText={!formdata.email?'Enter email':''}/>
                    <TextField label='Password'  type='password'  value={formdata.password} onChange={(e)=>setFormdata({...formdata,password:e.target.value})} helperText={!formdata.password?'Enter password':''}/>
                    <Button type='submit' size='large' style={{width:'auto'}} variant='contained'>LOgin</Button>
                    <Button type='button' size='large' style={{width:'auto'}} variant='contained'onClick={()=>navigate('/reset')} >forgot password</Button>

                </Stack>
            </form>
    </Layout>
  )
}

export default Login
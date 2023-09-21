import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Stack, TextField } from '@mui/material'
import {toast} from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
const [formdata,setFormdata]=useState({name:'',email:'',password:'',address:'',answer:''})
console.log(formdata);
const navigate=useNavigate()
const submithandle=async(e)=>{
    try {
      e.preventDefault();
      const postdata=await axios.post(`${process.env.REACT_APP_API}/api/auth/register`,formdata);
      if(postdata.data.success){
        toast.warning(postdata.data.success);
      }
      else if(postdata.data.message)
      {
        toast.success(postdata.data.message);
      }
      else{
        toast.error(postdata.data.email)
      }
      
    } catch (error) {
      console.log(error)
    }
}

  return (
    <Layout>
            <form onSubmit={submithandle} style={{width:'500px', margin:'0px auto'}}>
                <Stack spacing={4} direction={'column'} pt={5} textAlign={'center'}>
                    <TextField label='Name'  value={formdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})} helperText={!formdata.name?'Enter name':''}/>
                    <TextField label='Email'  value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})} helperText={!formdata.email?'Enter email':''}/>
                    <TextField label='Password'  type='password'  value={formdata.password} onChange={(e)=>setFormdata({...formdata,password:e.target.value})} helperText={!formdata.password?'Enter password':''}/>
                    <TextField label='Address'  value={formdata.address} onChange={(e)=>setFormdata({...formdata,address:e.target.value})} helperText={!formdata.address?'Enter address':''}/>
                    <TextField label='Answer'  value={formdata.answer} onChange={(e)=>setFormdata({...formdata,answer:e.target.value})} helperText={!formdata.answer?'Enter address':''}/>
                    <Button type='submit' size='large' style={{width:'100px'}} variant='contained'>Submit</Button>
                </Stack>
            </form>
    </Layout>
  )
}

export default Register
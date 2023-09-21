import { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetAuth = () => {
const [formdata,setFormdata]=useState({ email:'',password:'',answer:''})
const submithandle=async(e)=>{
    try {
        e.preventDefault();
        const postdata=await axios.post(`${process.env.REACT_APP_API}/api/auth/reset`,formdata);
        if(postdata.data.success){
         toast.success(postdata.data.message)}
        else
        {
             toast.error(postdata.data)
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
                    <TextField label='Email' type='text' value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})} helperText={!formdata.email?'enter the registered email':' '} />
                    <TextField label='Answer' type='string' value={formdata.answer} onChange={(e)=>setFormdata({...formdata,answer:e.target.value})} helperText={!formdata.answer?'type the answer':" "} />
                    <TextField label='Password'  type='password'  value={formdata.password} onChange={(e)=>setFormdata({...formdata,password:e.target.value})} helperText={!formdata.password?'Enter password':''}/>
                    <Button type='submit' size='large' style={{width:'auto'}} variant='contained'>update</Button>

                </Stack>
            </form>
    </Layout>
  )
}

export default ResetAuth
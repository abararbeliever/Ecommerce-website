import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Button, Icon, IconButton, MenuItem, Select, Stack,FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';
const Headers = () => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [auth,setAuth]=useAuth();
  const logouthandle=()=>{
    localStorage.removeItem('auth');
    setAuth({
      user:null,
      token:''
    })

  }
  

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }
  return (
   <>
   <AppBar position='sticky' sx={{backgroundColor:'#0089BA'}}>
    <Toolbar>
      <IconButton color='inherit'>
        <ShoppingCartCheckoutIcon/>
      </IconButton>
      <Typography variant='h6' sx={{flexGrow:1}}>
        Shopping cart
      </Typography>
      <Stack component={'div'} direction={'row'} spacing={2} color={'whitesmoke'} >
       <Link to={'/'} style={{color:'whitesmoke'}}><Button color='inherit'>home</Button></Link>
         <Link to={'/about'} style={{color:'whitesmoke'}}> <Button color='inherit'>Categories</Button></Link>

          {!auth.user ? (<><Link to={'/register'} style={{color:'whitesmoke'}}> <Button color='inherit'>Register</Button></Link>
         <Link to={'/login'} style={{color:'whitesmoke'}}> <Button color='inherit'>Login</Button></Link></>):
         (<>
         <FormControl variant='outlined'>
          <Select style={{height:'36px',color:'whitesmoke'}}
         value={selectedOption}
         onChange={handleChange}
         >
          
           <MenuItem value= "1"  style={{display:'none'}}>
        <Button  color='inherit'>{auth?.user?.name}</Button>
         </MenuItem>
         <MenuItem value= 'logout' style={{backgroundColor:'brown',color:'whitesmoke'}}>
         <Link to={'/login'} style={{color:'whitesmoke'}}>  <Button  color='inherit' onClick={logouthandle}>Logout</Button></Link>
         </MenuItem>
         <MenuItem value="option1" style={{backgroundColor:'brown',color:'whitesmoke'}}> <Link to={`/dashboard/${auth?.user?.role === 1 ?'admin':'user'}`} style={{color:'whitesmoke'}}> <Button color='inherit'>Dashboard</Button></Link></MenuItem>
       </Select> 
       </FormControl>
         </>)}
         
         <Link to={'/cart'} style={{color:'whitesmoke'}}> <Button color='inherit'>cart</Button></Link>
      </Stack>
    </Toolbar>
   </AppBar>
   </>
  )
}

export default Headers
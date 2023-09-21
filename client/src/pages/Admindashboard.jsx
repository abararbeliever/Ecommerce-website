import React from 'react'
import Adminmenu from '../components/Adminmenu'
import Layout from '../components/Layout'
import { useAuth } from '../context/Auth.js'
import { Typography } from '@mui/material'
const Admindashboard = () => {
  const [auth,setAuth]=useAuth();
  return (
    <>
  
  <Adminmenu/>
    </>
  )
}

export default Admindashboard
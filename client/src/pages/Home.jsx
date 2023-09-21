import React, { useState } from 'react'
import Layout from '../components/Layout'
import {useAuth} from '../context/Auth'
import { Box, Button } from '@mui/material';
import Modall from '../components/Modall';
const Home = () => {
  const [auth,setAuth]=useAuth();
  const [value, setValue] = useState(false)  

  return (
    <Layout>
      
      <pre>{JSON.stringify(auth)}</pre>
      
          </Layout>
  )
}

export default Home
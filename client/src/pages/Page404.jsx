import React from 'react'
import Layout from '../components/Layout'
import { Stack, Typography } from '@mui/material'

const Page404 = () => {
  return (
    <Layout>
      
      <Stack component={'div'} minHeight={'80vh'} bgcolor={'whitesmoke'} alignItems={'center'} pt={'200px'}>
        <Typography variant="h1" color="inherit" >404 </Typography>
        <Typography variant="h3" color={'inherit'}>OOPS! Not found</Typography>

      </Stack>

    </Layout>
  )
}

export default Page404
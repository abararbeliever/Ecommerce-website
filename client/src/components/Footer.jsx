import { Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
   <>
    <Stack textAlign={'center'} color={'whitesmoke'} p={1} alignItems={'center'} bgcolor={"#0089BA"} sx={{width:'100%'}}>
      <Typography variant='body'>

        All rights reserved &copy; copyright to e commerce
      </Typography>
      <Stack spacing={3} direction={'row'} component={'nav'}>
        <Button color='inherit' size='small'>About</Button>
        <Button color='inherit' size='small'>About</Button>
        <Button color='inherit' size='small'>About</Button>
      </Stack>
    </Stack>
   </>
  )
}

export default Footer
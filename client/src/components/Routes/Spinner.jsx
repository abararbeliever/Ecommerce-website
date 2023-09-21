import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

const Spinner = ({path='login'}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location=useLocation();
    useEffect(() => {
      
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        }, 1000);

        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
          });
        return () => clearInterval(interval)
    }, [count, navigate,location,path])

  return (
    <>
    <Box justifyContent={'center'} style={{ height: '100vh' }} display={'flex'} alignItems={'center'}> <CircularProgress />

<Typography variant="h5" color={'gray'}>Redirecting in to login page in{count}</Typography>
</Box>
    </>
  )
}

export default Spinner
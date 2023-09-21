import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Allproducts = () => {

    const navigate=useNavigate();
const [listporduct,setListproduct]=useState([])

const getallproducts=async()=>{
    try {
        const products= await axios.get("http://localhost:8080/api/product/get-product");
        if(products?.data.product)
        {
            console.log(products.data.product);
            setListproduct(products.data.product)
        }
        else{
            console.log("error")
        }
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
    getallproducts();
},[])

  return (
<>
<Typography variant='h4'  margin={5} color={'goldenrod'}>LIST OF ALL PRODUCTS</Typography>
    <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}  gap={2}>
       
    {listporduct.map((c)=>(
        <Card sx={{ margin:"auto", minWidth:"20%"}} >
            
                <CardHeader title={c.name}/>
                
            <CardMedia component={"img"}
            height="150" image={`/api/product/product-photo/${c._id}`}  alt={c.name} />
            <CardContent>
                <Typography variant='body2'>{c.description}</Typography>
            </CardContent>
            <CardActions><Button variant='outlined' onClick={()=>{navigate(`update/${c.slug}`)}}>Get</Button></CardActions>            
        </Card>
        ))}
    </Box>
</>
  )
}

export default Allproducts
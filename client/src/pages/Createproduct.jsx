import React, { useState } from 'react'
import { Box, Button, Input, MenuItem, Select, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import {useNavigate} from 'react-router-dom'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Createproduct = () => {
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]);
  const [age, setAge] = useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  //get category
  const getdata = async () => {
    try {

      const { data } = await axios.get('http://localhost:8080/api/category/get-category');

      if (data?.success) {
        setCategories(data.getcat)
        console.log(data)
      }


    } catch (error) {
      console.log(error);
      toast.error("something went wrong while fecthing category details")
    }
  }

  useEffect(() => {
    getdata();
  


  }, [])
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  

  // Create new product


  const createproduct = async(e) => {
   
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const response = await axios.post("http://localhost:8080/api/product/create-product",productData);
      if (response?.data.success) {
        toast.success(response.data.message);
        navigate('/')
      } else {
        toast.warning(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong while adding product")
    }

  }


 
  return (
    <>
      <Box alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>

        <Typography variant='h3' color={'goldenrod'}>
          ADD new product
        </Typography>
        <Box sx={{ width: "600px" }} >
          <form onSubmit={createproduct}>
            <TextField sx={{ width: '100%', margin: "15px" }} size='small' value={name} onChange={(e) => { setName( e.target.value ) }} label="Name" />
            <TextField sx={{ width: '100%', margin: "15px" }} size='small' value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" />
            <Select sx={{ width: '100%', margin: "15px" }} size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleChange}
            >
              {categories.map((c) => (<MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>))}

            </Select>
            <TextField sx={{ width: '100%', margin: "15px" }} size='small' value={price} onChange={(e) => { setPrice(e.target.value) }} label="Price" />
            <TextField sx={{ width: '100%', margin: "15px" }} size='small' type="number" value={quantity} onChange={(e) => { setQuantity( e.target.value ) }} label="Quantity" />

            <Select sx={{ width: '100%', margin: "15px" }} placeholder='select category' size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shipping}
              label="jhbhb"
              onChange={(e)=>setShipping(e.target.value)} >
              <MenuItem value={"0"}>Ten</MenuItem>
              <MenuItem value={"1"}>Twenty</MenuItem>

            </Select>
            <Button component="label" sx={{ width: '100%', margin: "15px" }} variant="contained" startIcon={<CloudUploadIcon />}>
              {photo?photo.name:"Upload file"}
              <VisuallyHiddenInput type="file" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}/>
            </Button>
            <Button type='submit' variant='outlined' sx={{ width: '100%', margin: "15px" }} size='large'>submit</Button>

          </form>
        </Box>
      </Box>

    </>
  )
}

export default Createproduct
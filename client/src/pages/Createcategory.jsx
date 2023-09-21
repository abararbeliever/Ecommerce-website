import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Modal from '../components/Modall';
import Modall from '../components/Modall';

export default function Createcategory() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(false) ;
  const [cname,setcname]=useState("") ;
  const [pid,setpid]=useState(null);

  const submithandle = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post('http://localhost:8080/api/category/create-category', { name });
      if (data?.success) {
        toast.success(data.message);
        getdata();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }

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
    getdata()


  }, [])


  //update category
  const updatecategory=async(e)=>{
    console.log("update")
    e.preventDefault();
    try {

      const {data}=await axios.put(`http://localhost:8080/api/category/update-category/${pid}`,{name:cname});
      if(data.message)
      {
        toast.success(`${cname} is updated`);
        getdata();
        setValue(!value)

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating")
    }
  }


//Delete category
const deletecat=async()=>{
try {
  const {data} = await axios.delete( `http://localhost:8080/api/category/delete-category/${pid}`); 
  if(data.message)
  {
    toast.success(data.message);
    getdata();
   
  }
} catch (error) {
  console.log(error);
  toast.error("Something went wrong");
}

}

  return (
    <>
      <Typography variant='h3' color={'darkgoldenrod'} gutterBottom>Manage Categories</Typography>
      <Box margin={5}>
        <form onSubmit={submithandle}>
          <TextField type='text' label="Add category" size='small' value={name} sx={{ marginRight: "5px" }} onChange={(e) => setName(e.target.value)}></TextField>
          <Button type='submit' variant='outlined' size='large' color='primary'>Submit</Button>
        </form>
      </Box>
      <TableContainer  >
        <Table sx={{ boxShadow: "5px 5px 5px #ccc", borderRadius: '3px' }} >
          <TableHead sx={{ bgcolor: 'grey' }} >
            <TableCell>Name</TableCell>
            <TableCell>Edit</TableCell>
          </TableHead>
          <TableBody >
            {categories.map((row) => (
              <>
             
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  
                  <TableCell >
                    <Button variant='contained' size='small' sx={{ marginRight: 2, bgcolor: 'goldenrod' }} color='success' onClick={()=>{setValue(!value);setcname(row.name);setpid(row._id);console.log(row._id)}} >Update</Button>
                    <Button variant='contained' size='small' color='error' onClick={()=>{setpid(row._id);deletecat()}}>Delete</Button>
                    </TableCell>
                    
                </TableRow>
                
              </>
            ))}
  <Modall value={value} setValue={setValue} cname={cname} setcname={setcname} updatecategory={updatecategory}/>

          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
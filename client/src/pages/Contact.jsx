import React from 'react';
import Layout from '../components/Layout';
import { Grid, ImageList, ImageListItem, Typography } from '@mui/material';

const Contact = () => {
  return (
    <Layout>
      <Grid container spacing={2} padding={10}>
        <Grid item xs={12} md={6}  padding={5} sx={{width:'40%',height:'auto', overflow:'none'}}>
       
      <img
        src={require('../images/132.jpg')}
        style={{width:'100%',height:'auto',borderRadius:'2px'}}
        
        alt={'Contact'}
        loading="lazy"
      />
 
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions or inquiries, feel free to reach out to us.
          </Typography>
          {/* Add your contact form, information, or any other content here */}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Contact;

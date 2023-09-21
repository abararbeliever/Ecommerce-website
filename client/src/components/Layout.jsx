import React from 'react';
import Headers from './Headers'
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const Layout = ({children}) => {
  return (
    <>
        <Headers/>
        <ToastContainer/>
      <main style={{minHeight:'90vh',backgroundColor:'whitesmoke',padding:'50px'}}>{children}</main>  
       <Footer />

    </>
  )
}

export default Layout
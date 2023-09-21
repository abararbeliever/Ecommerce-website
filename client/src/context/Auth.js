import { useState,useContext,createContext, useEffect } from "react";
import axios from 'axios'
const Usercontext=createContext();
console.log('hi')
const Authcontext=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:''
    });

axios.defaults.headers.common['Authorization']=auth?.token;
    
    useEffect(()=>{
        const data=localStorage.getItem('auth');
      
        if(data)
        {
            const parsedata=JSON.parse(data);
            setAuth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
    
            })
            console.log(parsedata)
        }
    },[])
    return(
        <Usercontext.Provider value={[auth,setAuth]}>
            {children}
        </Usercontext.Provider>
    )
}

const useAuth=()=>useContext(Usercontext);
export {useAuth,Authcontext}
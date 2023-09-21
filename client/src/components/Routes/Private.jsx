import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from "./Spinner";
import Layout from '../Layout'
const Private = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState();
    useEffect(() => {
        const authcheck = async () => {
            const res = await axios.get('/api/auth/auth-user')

            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        }
        if (auth?.token) authcheck() 
       
    }, [auth?.token])

    return (
        <Layout>
            {ok ? <Outlet /> : <Spinner path="/login"/>}
        </Layout>
    )
}

export default Private
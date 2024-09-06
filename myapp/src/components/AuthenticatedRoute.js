import { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthenticatedRoute () {
    const [auth, setAuth] = useState('loading');

    useEffect(() => {
        fetch('http://localhost:3002/', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "Success") {
                    setAuth('authenticated');
                } else {
                    setAuth('unAuthenticated')
                }
            })
    }, [])

    if(auth === 'loading'){
        return <div>loading...</div>
    }
    return (
        auth === 'authenticated' ? <Outlet/> : <Navigate to='/login'/>
    );
};
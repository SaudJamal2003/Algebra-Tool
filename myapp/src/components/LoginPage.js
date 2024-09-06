import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import "../Css/signup.css";


function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };
    
      const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('login fetch method')
        fetch('http://localhost:3002/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
          .then((response) => response.json())
          .then(res => {
            if (res.status === "Success") {
              navigate('/AlgebraSolver')
            }
            else {
              alert(res.error);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
  return (
    <>
        <div className='main' >
        <form onSubmit={handleSubmit}>
            <input type='text' className='name' onChange={handleInputChange} name= 'email' value={credentials.email || ' '} required />
            <input type='password' className='password' onChange={handleInputChange} name='password' value={credentials.password || ' '} required />
            <button type='submit'>Login</button>
        </form>
    </div>
    </>
  )
}

export default LoginPage
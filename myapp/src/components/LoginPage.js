import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ParticlesComponent from './particles';
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
              navigate('/home')
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
        <ParticlesComponent id='particles'/>
        <div className='main' >
        <form onSubmit={handleSubmit}>
          <h1>Login with your Credentials 🔑</h1>
          <div className='email'>
              <h2>Enter your email address</h2>
              <input type='text' className='name' onChange={handleInputChange}  placeholder='Email' name= 'email' value={credentials.email} required />
          </div>
           
           <div className='passwordfield'>
              <h2>Enter Password</h2>
              <input type='password' className='password' onChange={handleInputChange}  placeholder='Password' name='password' value={credentials.password} required />
            </div>  
            <button className='buttons' type='submit'>Login</button>
        </form>
    </div>
    </>
  )
}

export default LoginPage
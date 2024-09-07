import React, { useState } from 'react';
import "../Css/signup.css";
import { useNavigate } from 'react-router-dom';
import ParticlesComponent from './particles';

function Signup() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value});
};

const handleSubmit = (e) => {
    console.log("fetch method")
    fetch('http://localhost:3002/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const navigate = useNavigate();
    const navigateLogin = () => {
      navigate('/login')
    }


  return (
    <>
    <ParticlesComponent id='particles'/>
    <div className='main' >
        <form onSubmit={handleSubmit}>
          <h1>Signup 🚀</h1>
          <div className='email'>
              <h2>Enter valid email address</h2>
              <input type='text' className='name' onChange={handleInputChange} placeholder='Email' name= 'email' value={credentials.email} required />
           </div>
           <div className='passwordfield'>
              <h2>Enter Password</h2>
              <input type='password' className='password' onChange={handleInputChange} placeholder='Password' name='password' value={credentials.password} required />
          </div>
          <div className='buttonDiv'>
            <button className='buttons' type='submit'>Signup</button>
            <button className='buttons' onClick={navigateLogin}>Login</button>
          </div>
        </form>
    </div>
    
    </>
  )
}

export default Signup
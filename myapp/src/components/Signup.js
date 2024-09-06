import React, { useState } from 'react';
import "../Css/signup.css";
import { useNavigate } from 'react-router-dom';

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
    <div className='main' >
        <form onSubmit={handleSubmit}>
            <input type='text' className='name' onChange={handleInputChange} name= 'email' value={credentials.email || ' '} required />
            <input type='password' className='password' onChange={handleInputChange} name='password' value={credentials.password || ' '} required />
            <button type='submit'>Signup</button>
        </form>
            <button onClick={navigateLogin}>Login</button>
    </div>
    
    </>
  )
}

export default Signup
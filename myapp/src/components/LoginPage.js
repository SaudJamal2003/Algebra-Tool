import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ParticlesComponent from './particles';
import LoginCss from  "../Css/signup.module.css";


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
        <ParticlesComponent id={LoginCss.particles}/>
        <div className={LoginCss.main} >
        <form onSubmit={handleSubmit} className={LoginCss.credentialsForm}>
          <h1>Login with your Credentials 🔑</h1>
          <div className={LoginCss.email}>
              <h2>Enter your email address</h2>
              <input type='text' className={LoginCss.name} onChange={handleInputChange}  placeholder='Email' name= 'email' value={credentials.email} required />
          </div>
           
           <div className={LoginCss.passwordfield}>
              <h2>Enter Password</h2>
              <input type='password' className={LoginCss.password} onChange={handleInputChange}  placeholder='Password' name='password' value={credentials.password} required />
            </div>  
            <button className={LoginCss.buttons} type='submit'>Login</button>
        </form>
    </div>
    </>
  )
}

export default LoginPage
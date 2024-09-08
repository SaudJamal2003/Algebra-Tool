import React from 'react';
import homeCss from '../Css/HomeCss.module.css';
import ParticlesComponent from './particles';
import { useNavigate } from 'react-router-dom';



function Home() {

    const navigate = useNavigate();
    const handleAlgebra = () => {
        navigate('/AlgebraSolver')
    }

    const handleGithub = () => {
        window.open("https://github.com/SaudJamal2003?tab=repositories")
    }
    const handleLinkedin = () => {
        window.open("https://www.linkedin.com/in/saud-jamal/")
    }
    const handleInsta = () => {
        window.open("https://www.instagram.com/saudjamal1020/")
    }

    const handleLogout = async () => {
        await fetch('http://localhost:3002/logout',{
          credentials: 'include'
        })
        navigate(0)
      };

  return (
    <>
        <ParticlesComponent id={homeCss.particles}/>
        <div className={homeCss.homePage}>
            <nav>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="sigma"><path fill="#FFFFFF" d="M16,16H10.41l3.3-3.29a1,1,0,0,0,0-1.42L10.41,8H16a1,1,0,0,0,0-2H8a1,1,0,0,0-.92.62,1,1,0,0,0,.21,1.09L11.59,12l-4.3,4.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,8,18h8a1,1,0,0,0,0-2Z"></path></svg>

                <ul>
                    <li>Home</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>

            </nav>


            <div className={homeCss.main}>
                <h1>Welcome to MathWay!</h1>
                <hr></hr>
                <p>Unlock the power of AI-driven math assistance with MathWay, the cutting-edge model from Google AI. Whether you're tackling trigonometry, solving complex linear algebra equations, or exploring calculus, our tool offers instant solutions tailored to your needs. From basic algebra to advanced mathematical problems, we’ve designed the platform to handle it all effortlessly.</p>

                <h2>Types of Problems We Solve:</h2>

                <p><b>Trigonometry:</b> Solve trigonometric identities, equations, and find angle measures instantly.<br/>
                <b>Calculus:</b> Differentiate and integrate functions, solve limits, and explore the behavior of curves.
                <br/>
                <b>Algebra:</b> Solve quadratic equations, polynomials, and factorization problems step by step.
                <br/>
                <b>Graphing:</b> Visualize equations with dynamic graphs that provide a clear understanding of their structure and solutions.
                <br/>
                No matter the level of complexity, our AI-powered tool simplifies the process, offering solutions in real-time while providing graphical representations to enhance your understanding.</p>
            </div>

            <div className={homeCss.questiontype}>
                <div className={homeCss.parentButton}>
                    <button onClick={handleAlgebra} className={homeCss.linearAlgebra}><p>Linear Algebra</p></button>
                </div>
                <div  className={homeCss.parentButton}>
                    <button className={homeCss.linearAlgebra}><p>Trigonometry</p></button>
                </div>
                <div  className={homeCss.parentButton}>
                    <button className={homeCss.linearAlgebra}><p>Graph of Equations</p></button>
                </div>
               
            </div>


            <div className={homeCss.footer}>
                {/* <div className={homeCss.hr}>
                    <p></p>
                </div> */}
                <h1>Saud Jamal.</h1>
                <div className={homeCss.icons}>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleGithub} data-name="Layer 1" viewBox="0 0 24 24" id="github"><path fill="#FFFFFF" d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLinkedin} data-name="Layer 1" viewBox="0 0 24 24" id="linkedin"><path fill="#FFFFFF" d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"></path></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleInsta} data-name="Layer 1" viewBox="0 0 24 24" id="instagram"><path fill="#FFFFFF" d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg>
                </div>
            </div>

        </div>
    </>
  )
}

export default Home
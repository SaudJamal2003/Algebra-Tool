import './App.css';
import AlgebraPage from "./components/AlgebraSolvePage.js";
import SignUp from "./components/Signup.js";
import Login from "./components/LoginPage.js";
import AuthenticatedRoute from './components/AuthenticatedRoute.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
 

  return (
    <>
      <div>
       <BrowserRouter>
        <Routes>

          <Route element={<AuthenticatedRoute/>}>
            <Route exact path="/AlgebraSolver" element={<AlgebraPage />}>
            </Route>
          </Route>

          <Route exact path="/" element={<SignUp />}></Route>
          <Route exact path="/login" element={<Login />}></Route>

        </Routes>
       </BrowserRouter>



      </div>
    </>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';


function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />
          <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
          </div>

      </BrowserRouter>
    </>
  );
}

export default App;

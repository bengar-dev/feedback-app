import { Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";

import Login from './containers/Login'
import Register from './containers/Register'

function App() {

  const isAuth = localStorage.getItem('token')

  return (
    <div className="h-screen">
      {isAuth ? 
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      :
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      }
    </div>
  );
}

export default App;

import { Routes, Route, Link } from "react-router-dom";

import Login from './containers/Login'
import Register from './containers/Register'

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

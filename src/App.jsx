import React from 'react'
import Home from './Pages/Home/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <Outlet/>
  )
}

export default App
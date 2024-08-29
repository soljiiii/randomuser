import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate to="/1"/>}/> */}
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

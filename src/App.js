import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Diary from './pages/Diary'
import "./scss/index.scss"


export default function App() {
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/diary' element={<Diary/>}/>
      </Routes>

    </div>
  )
}

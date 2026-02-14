import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Diary from './components/Diary'
import "./sass/index.scss"


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

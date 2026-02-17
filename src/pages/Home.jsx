import React from 'react'
import Navbar from "../components/Navbar"


export default function Home() {
  return (
    <>
    <Navbar/>
    <div className='home'>
      <div className='container'>
        <div className='content'>
          <h1 className='title'> diary</h1>
          <p className='subtitle'>[diary] noun</p>
          <p className='description'> : a record of events, transactions, or observation kept daily or at frequent intervals</p>
          <p className='description'> : a daily record of personal activities, reflections, or feelings</p>
          <p className='description'> : a book intended or used for a diary</p>
          <a href='/diary'> <button> Let's write!</button> </a>
        </div>
      </div>
    </div>

    </>

  )
}

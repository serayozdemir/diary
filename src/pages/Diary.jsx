import React from 'react'
import Navbar from "../components/Navbar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Diary() {
  return (
    <div className='diary-page'>
        <Navbar/>
        <div className='editor'>
            <SimpleEditor/>
        </div>
    </div>
  )
}

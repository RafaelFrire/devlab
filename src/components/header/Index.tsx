import React from 'react'
import { Link, Navigate } from "react-router-dom"

import './index.css'





function Index() {
  return (
    <div className='container-xl bg-dark p-3'>
    <h1 className='text-white text-center'>DevLab</h1>
    <nav>
      <ul className='text-white'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/cursos'>Curso</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default Index;
import React from 'react'
import { NavLink } from 'react-router-dom'

const Content = () => {
  return (
    <>

  <NavLink to="/category">
    <button className='btn'>
        Add Category
    </button>
    </NavLink>
    
    </>
  )
}

export default Content
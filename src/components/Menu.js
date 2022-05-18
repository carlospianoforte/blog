import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav id='menu'>
        <Link to="/">Users</Link>
        <Link to="/works">Works</Link>
    </nav>
  )
}

export default Menu
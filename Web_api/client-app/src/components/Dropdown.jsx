import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
const Dropdown = () => {
  const {logout}=useAuth0();
  return (
    <div className='dropdown'>
        <button className='dropdown-btn'><NavLink to="/Profile" end>Profile</NavLink></button>
        <button className='dropdown-btn logout' onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    </div>
  )
}

export default Dropdown

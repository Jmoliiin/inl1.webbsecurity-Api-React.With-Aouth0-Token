import React from 'react'
import { useState } from 'react';
import Dropdown from './Dropdown';
const Avatar = ({user}) => {
const [dropdownOpen, setDropdownOpen]=useState(false);

  return (
    <div className='avatar-placeholder'>
        <div className='avatar-image-container' onClick={()=>setDropdownOpen(state=>!state)}>
            <img src={user.picture} alt={user.name}></img>
        </div>
        {
        dropdownOpen && <Dropdown/>
        }
    </div>
    
  )
}

export default Avatar
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import Avatar from "./Avatar";
import Loading from "../components/Loading";

export const Navbar = () => {
    const{isAuthenticated,user ,isLoading } = useAuth0()
    if (isLoading) {
        return <Loading />;
      }
    //const isAuthenticated = true;
  return (
<nav className="nav-bar">
    <div className="container">
        
        <div className="nav-bar-content">
        <NavLink className="navbar-brand" to="/"> 
        <svg id="Component_1_1" data-name="Component 1 – 1" xmlns="http://www.w3.org/2000/svg" width="150" height="70" viewBox="0 0 267 124">
        <text id="Bloggi" transform="translate(40 64)" fill="#1e1e1e" font-size="75" font-family="MS-UIGothic, MS UI Gothic"><tspan x="0" y="0">Bloggi</tspan></text>
        <text id="Company_Blog" data-name="Company Blog" transform="translate(48 116)" fill="#707070" font-size="28" font-family="ScriptMTBold, Script MT"><tspan x="0" y="0">Company Blog</tspan></text>
        <line id="Line_1" data-name="Line 1" x2="267" transform="translate(0 84)" fill="none" stroke="#30e5c0" stroke-width="1"/>
      </svg>
</NavLink>
            {/* <div className="img-container border">
                <img src="./images/tiger-.png" alt="" /> 
            </div> */}
            <div className="nav-bar-items">
                <ul>
                    <li>
                    <NavLink to="/" end>Blogposts</NavLink>
                    </li>
                    {
                    isAuthenticated
                    ?<>
                    <li>
                    <NavLink to="/CreatePost" end>Create Post</NavLink>
                    </li>
                        <Avatar user={user} />
                    </>
                    : <LoginButton/>
                    }
                </ul>
            </div>
      </div>
    </div>
</nav>
  )
}

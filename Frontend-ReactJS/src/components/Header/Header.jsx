import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./header.css"

/**
 * Component returns nav component.
 * 
 * @returns {React.ReactElement}
 */
function Header() {

 const user = useSelector((state) => state.user);

 return (
  <nav className="NavBar" role="navigation" aria-labelledby="firstLabel" aria-label="Primary">
   <NavLink to="/" className="NavBar-AppName">
    App Name
   </NavLink>
   <div>
    {
     (!user || !user.loggedIn) && (
      <ul className="NavBar-Items">
       <li><NavLink to="/login">Login</NavLink></li>
       <li><NavLink to="/signup">Signup</NavLink></li>
      </ul>
     )
    }
    {
     (user && user.loggedIn) && (
      <ul className="NavBar-Items">
       <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </ul>
     )
    }
   </div>
  </nav>
 );
}

export default Header;
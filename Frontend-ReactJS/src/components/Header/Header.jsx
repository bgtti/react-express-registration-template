import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"

function Header() {
 return (
  <nav className="NavBar">
   <Link to="/" className="NavBar-AppName">
    App Name
   </Link>
   <div>
    <ul className="NavBar-Items">
     <li><Link to="/login">Login</Link></li>
     <li><Link to="/signup">Signup</Link></li>
    </ul>
   </div>
  </nav>
 );
}

export default Header;
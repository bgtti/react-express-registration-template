import { Link } from 'react-router-dom'; // if using react-router for internal routing
import GithubIcon from "../../assets/icons/github.png";
import "./footer.css"

function Footer() {

 return (
  <footer className="Footer">
   <ul className="Footer-Nav">
    <li>
     <Link to="/terms">Terms of Service</Link>
    </li>
   </ul>
   <div>
    <p>2025 by</p>
    <a href="https://github.com/bgtti" target="_blank" rel="noopener noreferrer">
     <img src={GithubIcon} alt="github repo" />
    </a>
   </div>
  </footer>
 );
};

export default Footer;
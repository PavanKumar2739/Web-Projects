import { IoMdPerson } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ()=>{
  const bagList =  useSelector(state=>state.bag.bagList);
  console.log("bag contains ", bagList);
    return(
        <header>
        <div className="logo_container">
            <Link to="/">{/*helps to navigate work like a navigate to*/}
                <img className="myntra_home" src="../images/myntra_logo.webp" alt="Myntra Home"/>
            </Link>
        </div>
        <nav className="nav_bar">
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>
            <a href="#">Home & Living</a>
            <a href="#">Beauty</a>
            <a href="#">Studio <sup>New</sup></a>
        </nav>
        <div className="search_bar">
            <span className="material-symbols-outlined search_icon">search</span>
            <input className="search_input" placeholder="Search for products, brands and more"/>
        </div>
        <div className="action_bar">
            <div className="action_container">
            <IoMdPerson />
                <span className="action_name">Profile</span>
            </div>
            <FaHeart />
            <div className="action_container">
                 <span className="action_name">Wishlist</span>
            </div>

            <Link className="action_container" to="/bag">
            <IoBagHandle />
               <span className="action_name">Bag</span>
                <span className="bag-item-count">{bagList.length}</span>
            </Link>
        </div>
    </header>
    )
}
export default Header;
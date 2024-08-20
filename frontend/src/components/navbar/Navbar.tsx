import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import "./navbar.css";
import { logout } from "../../services/user";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  
  return (
    <nav>
      <div className="navbar">
        <div className="navbar_left">
          <b>NEXUM</b>
        </div>

        <div className="navbar_right">
          <div className="navbar_profile_search">
            <IoIosSearch className="small gray" />
            <input type="text" placeholder="Search..." />
          </div>

          <button className="navbar_profile_button">
            <FaPlus />
            <span className="text">Create</span>
          </button>

          <div className="navbar_profile_image">
            <img src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg" />
          </div>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

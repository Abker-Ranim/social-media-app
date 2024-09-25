import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import "./navbar.css";
import { logout, User } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthProvider";
import { baseURL } from "../../api/axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const [user] = useState<User | undefined>(auth);
  const handleLogout = () => {
    logout();
    setAuth(undefined);
    navigate("/login");
  };

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

          {auth && (
            <img
              src={baseURL + "/" + user?.image}
              alt="Profile"
              className="navbar_profile_image"
              style={{ cursor: "default" }}
            />
          )}
          <button className="navbar_logout_button" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

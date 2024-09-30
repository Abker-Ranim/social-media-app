import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import "./navbar.css";
import { logout, searchUsers } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthProvider";
import { baseURL } from "../../api/axios";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<any>([]);

  const handleLogout = () => {
    logout();
    setAuth(undefined);
    navigate("/login");
  };

  useEffect(() => {
    if (searchInput.trim() !== "") fetchUsers();
    else setUsers([]);
  }, [searchInput]);

  const fetchUsers = async () => {
    const searchedUsers = await searchUsers(searchInput);
    setUsers(searchedUsers);
  };

  const handleProfileClick = (id: string) => {
    navigate(`/profile/${id}`);
    setSearchInput("");
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
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {users.length > 0 && (
              <div className="navbar_search_results">
                {users.map((user: any) => (
                  <div
                    key={user._id}
                    className="navbar_search_result"
                    onClick={() => handleProfileClick(user._id)}
                  >
                    <img
                      src={baseURL + "/" + user.image}
                      alt="Profile"
                      className="navbar_search_result_image"
                    />
                    <span className="navbar_search_result_name">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="navbar_profile_button">
            <FaPlus />
            <span className="text">Create</span>
          </button>

          {auth && (
            <img
              src={baseURL + "/" + auth?.image}
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

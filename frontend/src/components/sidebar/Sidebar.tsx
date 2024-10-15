import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { FaCircle, FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthProvider";
import { baseURL } from "../../api/axios";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    navigate(`/profile/${auth?._id}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <div />
        <div />
        <div />
      </button>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="usernameCard" onClick={handleProfileClick}>
          {auth && (
            <div className="image_container">
              <img src={baseURL + "/" + auth?.profilePicture} alt="Profile" />
              <FaCircle className="online" />
            </div>
          )}
          <div className="username_info">
            <h3 className="username">
              {auth?.firstName} {auth?.lastName}
            </h3>
            <span>{auth?.email}</span>
          </div>
        </div>

        <div className="sidebar_menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <GoHome className="margin" />
            Home
          </NavLink>

          <NavLink to={`/profile/${auth?._id}`} className={({ isActive }) => (isActive ? "active" : "")}>
            <FaRegUser className="margin" />
            Profile
          </NavLink>

          <NavLink to={`/about`} className={({ isActive }) => (isActive ? "active" : "")}>
            <IoSettingsOutline className="margin" />
            About
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

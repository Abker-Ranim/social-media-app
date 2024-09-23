import React from "react";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const userId = "ranim";

  return (
    <div className="sidebar">
      <div className="usernameCard">
        <img
          className="username_image"
          src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
          alt="User"
        />
        <div className="username_info">
          <h3 className="username">ranim abker</h3>
          <span>@ranim</span>
        </div>
      </div>

      <div className="sidebar_menu">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <GoHome className="margin" />
          Home
        </NavLink>

        <NavLink
          to={`/profile/${userId}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaRegUser className="margin" />
          Profile
        </NavLink>
        <NavLink
          to={`/people`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <IoPeopleOutline className="margin" />
          People
        </NavLink>
        <NavLink
          to={`/photos`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MdOutlinePermMedia className="margin" />
          Photos
        </NavLink>
        <NavLink
          to={`/settings`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <IoSettingsOutline className="margin" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

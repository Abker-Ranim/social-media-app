import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useAuth } from "../../helpers/AuthProvider";
import { User } from "../../services/user";
import { baseURL } from "../../api/axios";

const Sidebar: React.FC = () => {
  const userId = "ranim";
  const { auth } = useAuth();
  const [user] = useState<User | undefined>(auth);


  return (
    <div className="sidebar">
      <div className="usernameCard">
      {auth && (
              <img
                src={baseURL + "/" + user?.image}
                alt="Profile"
                className="username_image"
                style={{ cursor: "default" }}
              />
            )}
        <div className="username_info">
          <h3 className="username">{user?.firstName} {user?.lastName}</h3>
          <span>{user?.email}</span>
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

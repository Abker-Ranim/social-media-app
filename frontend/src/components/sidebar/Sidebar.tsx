import React from "react";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthProvider";
import { baseURL } from "../../api/axios";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const handleProfileClick = () => {
    navigate(`/profile/${auth?._id}`);
  };
  return (
    <div className="sidebar">
      <div className="usernameCard" onClick={handleProfileClick}>
        {auth && (
          <img
            src={baseURL + "/" + auth?.profilePicture}
            alt="Profile"
            className="username_image"
          />
        )}
        <div className="username_info">
          <h3 className="username">
            {auth?.firstName} {auth?.lastName}
          </h3>
          <span>{auth?.email}</span>
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
          to={`/profile/${auth?._id}`}
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

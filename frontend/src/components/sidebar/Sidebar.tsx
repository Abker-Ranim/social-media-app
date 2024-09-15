import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home"); 
  const navigate = useNavigate();
  const userId = "ranim";

  const handleTabClick = (tab: string) => { 0
    setActiveTab(tab);
  };

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
        <Link
          to="/"
          className={activeTab === "home" ? "active" : ""}
          onClick={() => handleTabClick("home")}
        >
          <GoHome className="margin" />
          Home
        </Link>

        <a
          onClick={() => {
            handleTabClick("profile");
            navigate(`/profile/${userId}`);
          }}
          className={activeTab === "profile" ? "active" : ""}
        >
          <FaRegUser className="margin" />
          Profile
        </a>

        <a
          onClick={() => handleTabClick("people")}
          className={activeTab === "people" ? "active" : ""}
        >
          <IoPeopleOutline className="margin" />
          People
        </a>

        <a
          onClick={() => handleTabClick("photos")}
          className={activeTab === "photos" ? "active" : ""}
        >
          <MdOutlinePermMedia className="margin" />
          Photos
        </a>

        <a
          onClick={() => handleTabClick("settings")}
          className={activeTab === "settings" ? "active" : ""}
        >
          <IoSettingsOutline className="margin" />
          Settings
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

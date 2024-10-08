import React, { useState } from "react";
import "./people.css";
import { baseURL } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

interface PeopleProps {
    id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

const People: React.FC<PeopleProps> = ({ id,firstName, lastName, email, profilePicture }) => {
    const navigate = useNavigate();


    const handleProfileClick = (id: string) => {
        navigate(`/profile/${id}`);
      };
    
  return (
    <div className="card">
      <div className="usernameCard" onClick={() => handleProfileClick(id)}>
        <img
          src={baseURL + "/" + profilePicture}
          alt="Profile"
          className="username_image"
          style={{ cursor: "default" }}
        />
        <div className="username_info">
          <h3 className="username">
            {firstName} {lastName}
          </h3>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default People;

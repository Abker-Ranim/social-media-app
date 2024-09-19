import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.css";
import UserProfile from '../userProfile/UserProfile';

const Home: React.FC = () => {
  const { userId } = useParams();
  return (
    <div className="profile-page">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        <UserProfile />

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Home;

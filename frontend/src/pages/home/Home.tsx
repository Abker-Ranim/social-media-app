import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import UserProfile from '../userProfile/UserProfile';

const Home: React.FC = () => {
  const { userId } = useParams(); 
  return (
    <div className="app">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        {userId ? <UserProfile /> : <Posts />}

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Home;

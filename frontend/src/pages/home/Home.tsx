import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        <Posts type={"all"} />

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Home;

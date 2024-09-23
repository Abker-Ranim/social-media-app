import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Conversations from "../../components/rightbar/conversations/conversations";
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
      <Conversations />
    </div>
  );
};

export default Home;

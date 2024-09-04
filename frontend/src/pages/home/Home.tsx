import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Conversations from "../../components/rightbar/conversations/conversations";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = () => {
  return (
    <div className="app">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        <Posts />

        <div className="right"></div>
      </div>
      <Conversations />
    </div>
  );
};

export default Home;

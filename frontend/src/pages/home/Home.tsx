import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
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
    </div>
  );
};

export default Home;

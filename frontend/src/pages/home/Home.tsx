import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";

import Sidebar from "../../components/sidebar/Sidebar";
import UsernameCard from "../../components/usernameCard/UsernameCard";


const Home = () => {
    return (
        <>

            < Navbar />
            <div className="layout-app">
             <div style={{width:"25%"}}><UsernameCard /> <Sidebar /></div>

            <div style={{width:"50%"}}><Posts /></div>
            <div style={{width:"25%"}}>right</div>
            </div>
        </>
    );
}

export default Home;

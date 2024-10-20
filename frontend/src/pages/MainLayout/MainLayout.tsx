import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Conversations from "../../components/rightbar/conversations/conversations";
import { useChat } from "../../helpers/ChatContext";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  const { setShowChat } = useChat();

  const location = useLocation();

  const authPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <>
      {!authPage ? (
        <div className="main-layout">
          <Navbar />
          <div className="main-content">
            <Sidebar />

            <div className="middle">
              <Outlet />
            </div>

            <div className="right">
              <Conversations closeChat={closeChat} />
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default MainLayout;

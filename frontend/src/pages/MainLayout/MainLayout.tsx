import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const authPage =
    location.pathname === "/login" || location.pathname === "/signup";
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

            <div className="right"></div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default MainLayout;

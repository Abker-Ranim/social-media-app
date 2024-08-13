import "./sidebar.css";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="usernameCard">
                <div className="username_image">
                    <img src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg" />
                </div>
                <div className="username_info">
                    <h3 className="username">ranim abker</h3>
                    <span>@ranim</span>
                </div>
            </div>
            <div className="sidebar_menu">
                <a className="active">
                    <GoHome className="margin" />
                    home
                </a>
                <a>
                    <FaRegUser className="margin" />
                    Profile
                </a>
                <a>
                    <IoPeopleOutline className="margin" />
                    People
                </a>
                <a>
                    <MdOutlinePermMedia className="margin" />
                    photos
                </a>
                <a>
                    <IoSettingsOutline className="margin" />
                    settings
                </a>
            </div>
        </div>
    );
}

export default Sidebar;

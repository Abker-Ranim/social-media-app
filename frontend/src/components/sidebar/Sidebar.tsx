import "./sidebar.css";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const sidebar = () => {
    return (
        <>

            <div className="sidebar">
                <div className="sidebar_menu">
                    <a className="active" ><GoHome  className="margin"/>
                    home</a>
                    <a><FaRegUser className="margin"/>
                    Profile</a>
                    <a ><IoPeopleOutline className="margin"/>
                    People</a>
                    <a ><MdOutlinePermMedia className="margin"/>
                    photos</a>
                    <a ><IoSettingsOutline className="margin"/>
                    settings</a>
                </div>
            </div>


        </>
    );
}

export default sidebar;
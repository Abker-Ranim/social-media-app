import { FaEdit, FaUserEdit, FaEnvelope, FaUserPlus } from "react-icons/fa";
import "./userProfile.css";
import Posts from "../../components/posts/Posts";
import Conversations from "../../components/rightbar/conversations/conversations";
import { useState } from "react";
import { baseURL } from "../../api/axios.ts";
import {  User } from "../../services/user";
import { useAuth } from "../../helpers/AuthProvider.tsx";

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [user] = useState<User | undefined>(auth);

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  // useEffect(() => {
  //   if (id !== auth?._id) {
  //     fetchUser()
  //   }
  // });
  // const fetchUser = async () => {
  //   const response = await getUserDetails(id);
  //   setUser(response);
  // };
  return (
    <div className="profile">
      <div className="user-profile">
        <div className="cover-photo">
          <img
            alt="Cover"
            src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
            className="cover-image"
          />
          <button className="edit-cover-btn">
            <FaEdit />
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-photo-container">
            {auth && (
              <img
                src={baseURL + "/" + user?.image}
                alt="Profile"
                className="profile-photo"
                style={{ cursor: "default" }}
              />
            )}

            <button className="edit-profile-btn">
              <FaEdit />
            </button>
          </div>
          <div className="user-details">
            <h2 className="username">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="user-handle">{user?.email}</p>
          </div>
          <div className="profile-actions">
            <button className="follow-btn">
              <FaUserPlus />
            </button>
            <button className="message-btn" onClick={toggleChat}>
              <FaEnvelope />
            </button>
            <button className="edit-info-btn">
              <FaUserEdit />
            </button>
          </div>
        </div>
      </div>
      <Posts type={"mine"} />
      {showChat && <Conversations closeChat={toggleChat} />}{" "}
    </div>
  );
};

export default Profile;

import { FaEdit, FaUserEdit, FaEnvelope, FaUserPlus } from "react-icons/fa";
import "./Profile.css";
import Posts from "../../components/posts/Posts.tsx";
import Conversations from "../../components/rightbar/conversations/conversations.tsx";
import { useEffect, useState } from "react";
import { baseURL } from "../../api/axios.ts";
import { getUserDetails, User } from "../../services/user.ts";
import { useAuth } from "../../helpers/AuthProvider.tsx";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { userId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | undefined>(auth);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    if (userId !== auth?._id) {
      fetchUser();
    } else {
      setUser(auth);
    }
  }, [userId]);
  const fetchUser = async () => {
    console.log(userId);
    if (userId) {
      const response = await getUserDetails(userId);
      setUser(response);
    }
  };

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
      <Posts userId={user?._id} />
      {showChat && <Conversations closeChat={toggleChat} />}{" "}
    </div>
  );
};

export default Profile;

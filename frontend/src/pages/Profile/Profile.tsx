import { FaEdit, FaUserEdit, FaEnvelope, FaUserPlus } from "react-icons/fa";
import "./Profile.css";
import Posts from "../../components/posts/Posts.tsx";
import Conversations from "../../components/rightbar/conversations/conversations.tsx";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../api/axios.ts";
import { getUserDetails, User } from "../../services/user.ts";
import { useAuth } from "../../helpers/AuthProvider.tsx";
import { useParams } from "react-router-dom";
import ImageCrop from "../../components/ImageCrop/ImageCrop.tsx";

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { userId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | undefined>(auth);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const profilePictureRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    if (userId !== auth?._id) {
      fetchUser();
    } else {
      setUser(auth);
    }
  }, [userId, auth]);
  const fetchUser = async () => {
    if (userId) {
      const response = await getUserDetails(userId);
      setUser(response);
    }
  };

  const handleProfilePictureEdit = () => {
    profilePictureRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    setProfilePicture(e.target.files[0]);
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
          {auth?._id === userId && (
            <button className="edit-cover-btn" title="Edit Cover Picture">
              <FaEdit />
            </button>
          )}
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

            {auth?._id === userId && (
              <>
                <button
                  className="edit-profile-btn"
                  title="Edit Profile Picture"
                  onClick={handleProfilePictureEdit}
                >
                  <FaEdit />
                </button>
                <input
                  type="file"
                  ref={profilePictureRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png, image/jpg"
                />

                {profilePicture && (
                  <ImageCrop
                    picture={profilePicture}
                    setPicture={setProfilePicture}
                  />
                )}
              </>
            )}
          </div>
          <div className="user-details">
            <h2 className="username">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="user-handle">{user?.email}</p>
          </div>
          <div className="profile-actions">
            {auth?._id !== userId && (
              <button className="follow-btn" title="Follow User">
                <FaUserPlus />
              </button>
            )}
            <button
              className="message-btn"
              title="Send Message"
              onClick={toggleChat}
            >
              <FaEnvelope />
            </button>
            {auth?._id === userId && (
              <button className="edit-info-btn" title="Edit Profile">
                <FaUserEdit />
              </button>
            )}
          </div>
        </div>
      </div>
      <Posts userId={user?._id} />
      {showChat && <Conversations closeChat={toggleChat} />}
    </div>
  );
};

export default Profile;

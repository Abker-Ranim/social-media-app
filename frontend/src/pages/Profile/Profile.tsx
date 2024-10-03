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
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverPictureRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setShowChat(true);
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

  const handleCoverPictureEdit = () => {
    coverPictureRef.current?.click();
  };
  const handleProfilePictureEdit = () => {
    profilePictureRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    setProfilePicture(e.target.files[0]);
  };
  const handleCoverPictureChange = (e: any) => {
    setCoverPicture(e.target.files[0]);
  };
  return (
    <div className="profile">
      <div className="user-profile">
        <div className="cover-photo">
          {auth && (
            <img
              src={baseURL + "/" + user?.cover}
              alt="Profile"
              className="cover-image"
              style={{ cursor: "default" }}
            />
          )}
          {auth?._id === userId && (
            <>
              <button
                className="edit-cover-btn"
                title="Edit Cover Picture"
                onClick={handleCoverPictureEdit}
              >
                <FaEdit />
              </button>
              <input
                type="file"
                ref={coverPictureRef}
                onChange={handleCoverPictureChange}
                style={{ display: "none" }}
                accept="image/jpeg, image/png, image/jpg"
              />
              {coverPicture && (
                <ImageCrop
                profilePicture={null} 
                coverPicture={coverPicture}
                setProfilePicture={setProfilePicture}
                setCoverPicture={setCoverPicture}
                />
              )}
            </>
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
                  profilePicture={profilePicture}
                  coverPicture={null} 
                  setProfilePicture={setProfilePicture}
                  setCoverPicture={setCoverPicture} 
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
      {showChat && <Conversations closeChat={() => setShowChat(false)} />}
    </div>
  );
};

export default Profile;

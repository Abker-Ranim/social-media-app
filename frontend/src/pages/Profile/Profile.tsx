import { FaEdit, FaUserEdit, FaEnvelope, FaUserPlus } from "react-icons/fa";
import "./Profile.css";
import Posts from "../../components/posts/Posts.tsx";
import Conversations from "../../components/rightbar/conversations/conversations.tsx";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../api/axios.ts";
import { followUser, getUserDetails, unfollowUser, User } from "../../services/user.ts";
import { useAuth } from "../../helpers/AuthProvider.tsx";
import { useParams } from "react-router-dom";
import ImageCrop from "../../components/ImageCrop/ImageCrop.tsx";
import toast from "react-hot-toast";

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { userId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | undefined>(auth);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverPictureRef = useRef<HTMLInputElement>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

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

    if (response.followers && Array.isArray(response.followers)) {
      setIsFollowing(response.followers.includes(auth?._id));
    } else {
      setIsFollowing(false); 
    }
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
  const handleFollowClick = async () => {
    if (!isFollowing) {
      try {
        if (userId) { 
          await followUser(userId); 
          setIsFollowing(true); 
          toast.success("Vous suivez cet utilisateur."); 
        }
      } catch (error) {
        console.error("Failed to follow user:", error);
        toast.error("Échec du suivi de l'utilisateur."); 
      }
    } else {
      try {
        if (userId) { 
          await unfollowUser(userId); 
          setIsFollowing(false); 
          toast.success("Vous ne suivez plus cet utilisateur."); 
        }
      } catch (error) {
        console.error("Failed to unfollow user:", error);
        toast.error("Échec de la désinscription de l'utilisateur."); // Notification d'erreur
      }
    }
  };
  
  return (
    <div className="profile">
      <div className="user-profile">
        <div className="cover-photo">
          {auth && (
            <img
              src={baseURL + "/" + user?.coverPicture}
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
                  type="cover"
                  image={coverPicture}
                  setImage={setCoverPicture}
                />
              )}
            </>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-photo-container">
            {auth && (
              <img
                src={baseURL + "/" + user?.profilePicture}
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
                    type="profile"
                    image={profilePicture}
                    setImage={setProfilePicture}
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
              <button
                className="follow-btn"
                title="Follow User"
                onClick={handleFollowClick}
              >
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

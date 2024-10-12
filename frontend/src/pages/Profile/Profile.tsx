import {
  FaUserEdit,
  FaEnvelope,
  FaUserPlus,
  FaUserCheck,
  FaCircle,
} from "react-icons/fa";
import "./Profile.css";
import Posts from "../../components/posts/Posts.tsx";
import Conversations from "../../components/rightbar/conversations/conversations.tsx";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../api/axios.ts";
import {
  followUser,
  getUserDetails,
  unfollowUser,
  User,
} from "../../services/user.ts";
import { useAuth } from "../../helpers/AuthProvider.tsx";
import { useParams } from "react-router-dom";
import ImageCrop from "../../components/ImageCrop/ImageCrop.tsx";
import toast from "react-hot-toast";
import People from "./People/People.tsx";
import { MdPhotoCamera } from "react-icons/md";
import { useSocketContext } from "../../helpers/SocketContext.tsx";

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { onlineUsers } = useSocketContext();
  const { userId } = useParams();

  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [numberOfFollowers, setNumberOfFollowers] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("followers");

  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverPictureRef = useRef<HTMLInputElement>(null);

  const isOnline = onlineUsers.some((user) => user === userId);

  const toggleChat = () => {
    setShowChat(true);
  };

  useEffect(() => {
    fetchUser();
  }, [userId, auth]);

  const fetchUser = async () => {
    if (userId) {
      const response = await getUserDetails(userId);
      setUser(response);
      setIsFollowing(response.isFollowing);
      setNumberOfFollowers(response.numberOfFollowers);
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
          setNumberOfFollowers((prev) => prev + 1);
          toast.success("User Followed");
        }
      } catch (error) {
        console.error("Failed to follow user:", error);
        toast.error("Failed to follow user");
      }
    } else {
      try {
        if (userId) {
          await unfollowUser(userId);
          setIsFollowing(false);
          setNumberOfFollowers((prev) => prev - 1);
          toast.success("User Unfollowed");
        }
      } catch (error) {
        console.error("Failed to unfollow user:", error);
        toast.error("Failed to unfollow user");
      }
    }
  };

  const openPopup = (tab: string) => {
    setActiveTab(tab);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="profile">
      <div className="user-profile">
        <div className="cover-photo">
          <img
            src={baseURL + "/" + user?.coverPicture}
            alt="Profile"
            className="cover-image"
          />
          {auth?._id === userId && (
            <>
              <button
                className="edit-cover-btn"
                title="Edit Cover Picture"
                onClick={handleCoverPictureEdit}
              >
                <MdPhotoCamera />
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
            <img
              src={baseURL + "/" + user?.profilePicture}
              alt="Profile"
              className="profile-photo"
            />
            {auth?._id === userId ? (
              <>
                <button
                  className="edit-profile-btn"
                  title="Edit Profile Picture"
                  onClick={handleProfilePictureEdit}
                >
                  <MdPhotoCamera />
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
            ) : (
              isOnline && <FaCircle className="online" />
            )}
          </div>
          <div className="user-details">
            <h2 className="username">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="user-handle">{user?.email}</p>
            <div className="user-info">
              <p>
                <span>{user?.numberOfPosts}</span> Post
                {user?.numberOfPosts !== 1 && "s"}
              </p>
              <p
                className="popup-trigger"
                title="Show Followers"
                onClick={() => openPopup("followers")}
              >
                <span>{numberOfFollowers}</span> Followers
              </p>
              <p
                className="popup-trigger"
                title="Show Following"
                onClick={() => openPopup("following")}
              >
                <span>{user?.numberOfFollowing}</span> Following
              </p>
            </div>
          </div>
          <div className="profile-actions">
            {auth?._id !== userId && (
              <button
                className="follow-btn"
                title={isFollowing ? "Unfollow User" : "Follow User"}
                onClick={handleFollowClick}
              >
                {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
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
      {showChat && (
        <Conversations
          defaultUser={user}
          closeChat={() => setShowChat(false)}
        />
      )}
      <People
        userId={user?._id}
        isPopupOpen={isPopupOpen}
        activeTab={activeTab}
        closePopup={closePopup}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Profile;

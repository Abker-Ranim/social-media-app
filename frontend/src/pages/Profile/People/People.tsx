import { useEffect, useState } from "react";
import Popup from "../../../components/Popup/Popup.tsx";
import "./People.css";
import { getFollowList } from "../../../services/user.ts";
import { baseURL } from "../../../api/axios.ts";
import { useNavigate } from "react-router-dom";

interface PeopleProps {
  userId: string | undefined;
  isPopupOpen: boolean;
  activeTab: string;
  closePopup: () => void;
  setActiveTab: (tab: string) => void;
}

const People: React.FC<PeopleProps> = ({
  userId,
  isPopupOpen,
  activeTab,
  closePopup,
  setActiveTab,
}) => {
  const navigate = useNavigate();

  const [follows, setFollows] = useState<any>([]);

  useEffect(() => {
    const getFollows = async () => {
      if (userId) {
        const response = await getFollowList(userId);
        setFollows(response);
      }
    };
    getFollows();
  }, [userId]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleProfileClick = (id: string) => {
    navigate(`/profile/${id}`);
    closePopup();
  };

  return (
    <Popup isOpen={isPopupOpen} onRequestClose={closePopup} width="20%">
      <div className="follow-popup">
        <div className="header">
          <span
            className={`title ${activeTab === "followers" ? "active" : ""}`}
            onClick={() => handleClick("followers")}
          >
            Followers
          </span>
          <span
            className={`title ${activeTab === "following" ? "active" : ""}`}
            onClick={() => handleClick("following")}
          >
            Following
          </span>
        </div>
        <div className="content">
          {follows[activeTab] &&
            follows[activeTab].map((follow: any) => (
              <div
                key={follow._id}
                className="follow"
                onClick={() => handleProfileClick(follow._id)}
              >
                <img
                  src={baseURL + "/" + follow.profilePicture}
                  alt="Profile"
                  className="username_image"
                />
                <div className="username_info">
                  <h3 className="username">
                    {follow.firstName} {follow.lastName}
                  </h3>
                  <span>{follow.email}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Popup>
  );
};

export default People;

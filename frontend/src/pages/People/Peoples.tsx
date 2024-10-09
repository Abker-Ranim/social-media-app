import React, { useEffect, useState } from "react";
import "./peoples.css";
import People from "./people/people";
import { getFollowers, getFollowing } from "../../services/user";

const Peoples: React.FC = () => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const fetchedFollowers = await getFollowers();
        setFollowers(fetchedFollowers);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };

    fetchFollowers();
  }, []);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const fetchedFollowing = await getFollowing();
        setFollowing(fetchedFollowing);
      } catch (error) {
        console.error("Failed to fetch Following:", error);
      }
    };

    fetchFollowing();
  }, []);
  const toggleFollowers = async () => {
    setShowFollowers((prevShowFollowers) => !prevShowFollowers);
  };
  const toggleFollowing = async () => {
    setShowFollowing((prevShowFollowing) => !prevShowFollowing);
  };
  return (
    <>
      <div className="follow-container">
        <h2> {followers.length} Followers</h2>
        <button className="toggle_Followers_button" onClick={toggleFollowers}>
          {showFollowers ? "Hide Followers" : "Show Followers"}
        </button>
        {showFollowers && followers.length > 0 && (
          <div className="post_list">
            {followers
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((people) => (
                <People
                  key={people._id}
                  id={people._id}
                  firstName={people.firstName}
                  lastName={people.lastName}
                  email={people.email}
                  profilePicture={people.profilePicture}
                />
              ))}
          </div>
        )}
      </div>

      <div className="follow-container">
        <h2> {following.length} Following</h2>
        <button className="toggle_Followers_button" onClick={toggleFollowing}>
          {showFollowing ? "Hide Following" : "Show Following"}
        </button>
        {showFollowing && following.length > 0 && (
          <div className="post_list">
            {following
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((people) => (
                <People
                  key={people._id}
                  id={people._id}
                  firstName={people.firstName}
                  lastName={people.lastName}
                  email={people.email}
                  profilePicture={people.profilePicture}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Peoples;

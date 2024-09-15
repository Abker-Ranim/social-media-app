import { FaEdit, FaUserEdit, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import './userProfile.css';
import Posts from '../../components/posts/Posts';

const Profile: React.FC = () => {
  return (
    <div className='profile'>
      <div className="user-profile">
        <div className="cover-photo">
          <img
            src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
            alt="Cover"
            className="cover-image"
          />
          <button className="edit-cover-btn">
            <FaEdit />
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-photo-container">
            <img
              src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
              alt="Profile"
              className="profile-photo"
            />
            <button className="edit-profile-btn">
              <FaEdit />
            </button>
          </div>
          <div className="user-details">
            <h2 className="username">Ranim Abker</h2>
            <p className="user-handle">@ranim</p>
          </div>
          <div className="profile-actions">
            <button className="follow-btn">
              <FaUserPlus />
            </button>
            <button className="message-btn">
              <FaEnvelope />
            </button>
            <button className="edit-info-btn">
              <FaUserEdit />
            </button>
          </div>
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Profile;

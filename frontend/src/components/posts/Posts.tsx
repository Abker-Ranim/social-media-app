import { FaPlus } from "react-icons/fa6";
import Post from "./post/Post";
import "./posts.css";

const Posts = () => {
  return (
    <div className="posts">
      <div className="new_post">
        <div className="user_details">
          <img
            src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
            alt=""
          />
          <h3>Ranim</h3>
        </div>

        <textarea
          className="new_post_textbox"
          placeholder="what's in your mind..?"
        ></textarea>

        <button>
          <FaPlus />
        </button>
      </div>

      <div className="post_list">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Posts;

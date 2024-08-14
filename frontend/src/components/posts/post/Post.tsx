import "./post.css";

const Post = () => {
  return (
    <div className="post">
      <div className="post_user_details">
        <img
          src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
          alt="User"
        />

        <div className="user_name">
          <h4>Ranim</h4>
          <span>14 hours ago</span>
        </div>
      </div>

      <div className="post_content_details">
        <p>Hello, this is my first post</p>
      </div>
    </div>
  );
};

export default Post;

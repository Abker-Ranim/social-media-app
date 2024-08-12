import "./post.css";

const Post = () => {
    return (
        <div className="post">
            <div className="post_user_details">
                <div className="user_image">
                    <img 
                        src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg" 
                        alt="User" 
                    />
                </div>
                <div className="user_name">
                    <h5>Ranim</h5>
                    <span>14 hours ago</span>
                </div>
            </div>
            <div className="post_content_details">
                <p>Hello, this is my first post</p>
            </div>
            <div className="post_buttons">
            </div>
        </div>
    );
}

export default Post;

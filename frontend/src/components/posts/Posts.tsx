import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { createPost, getPosts, NewPost } from "../../services/post";
import { User, getCurrentUser } from "../../services/user";
import "./posts.css";
import Post from "./post/Post";

const Posts = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<NewPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleNewPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    if (newPostContent.trim()) {
      const newPost: NewPost = {
        content: newPostContent,
        postOwner: user.id || "", 
      };

      try {
        const response = await createPost(newPost);
        setPosts(prevPosts => [...prevPosts, response.data.createdPost]);
        setNewPostContent("");
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    } else {
      console.warn("Post content is empty");
    }
  };

  return (
    <div className="posts">
      <div className="new_post">
        <div className="user_details">
          <img
            src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
            alt=""
          />
          <h3>{user?.firstName || "Ranim"}</h3>
        </div>

        <textarea
          className="new_post_textbox"
          placeholder="What's in your mind..?"
          value={newPostContent}
          onChange={handleNewPostChange}
        ></textarea>

        <button className="navbar_profile_button" onClick={handlePostSubmit}>
          <FaPlus />
          <span className="text">Post</span>
        </button>
      </div>

      <div className="post_list">
        {posts.map((post) => (
          <Post key={post.id} content={post.content} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

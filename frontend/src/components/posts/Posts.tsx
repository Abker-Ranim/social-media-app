import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { createPost, getPosts, Post as PostType } from "../../services/post";
import "./posts.css";
import Post from "./post/Post";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        console.log(fetchedPosts)
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPostContent.trim()) {
      const newPost = {
        content: newPostContent,
      };
  
      try {
        const response = await createPost(newPost);
        if (response.data && response.data.createdPost) {
          const { createdPost } = response.data;
                    
          // const createdAtDate = new Date(createdPost.createdAt);
          // if (isNaN(createdAtDate.getTime())) {
          //   console.error("Invalid date:", createdPost.createdAt);
          // }
          
          setPosts(prevPosts => [...prevPosts, createdPost]);
        }
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
          <h3>{"Ranim"}</h3>
        </div>

        <textarea
          className="new_post_textbox"
          placeholder="What's in your mind..?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>

        <button className="navbar_profile_button" onClick={handlePostSubmit}>
          <FaPlus />
          <span className="text">Post</span>
        </button>
      </div>

      <div className="post_list">
        {
          posts
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((post, index) => (
            <Post
              key={index}
              content={post.content}
              _id={post._id}
              createdAt={post.createdAt}
              liked={post.liked}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Posts;

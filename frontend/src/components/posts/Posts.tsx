import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  createPost,
  getMyPosts,
  getPosts,
  Post as PostType,
} from "../../services/post";
import "./posts.css";
import Post from "./post/Post";
import toast from "react-hot-toast";
import { useAuth } from "../../helpers/AuthProvider";
import { User } from "../../services/user";
import { baseURL } from "../../api/axios";

interface IProps {
  type: string;
}

const Posts = ({ type }: IProps) => {
  const { auth } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [user, setUser] = useState<User | undefined>(auth);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts =
          type === "all" ? await getPosts() : await getMyPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPostContent.trim()) {
      const newPost = { content: newPostContent };
      try {
        const response = await createPost(newPost);
        if (response.data && response.data.createdPost) {
          toast.success("Post Created Successfully");
          setPosts((prevPosts) => [...prevPosts, response.data.createdPost]);
        }
        setNewPostContent("");
      } catch (error) {
        toast.error("Error Creating Post. Please try again later.");
        console.error("Failed to create post:", error);
      }
    } else {
      console.warn("Post content is empty");
    }
  };

  const handleDeletePost = (_id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== _id));
  };

  return (
    <div className="posts">
      <div className="new_post">
        <div className="user_details">
          {auth && (
            <img
              src={baseURL + "/" + user?.image}
              alt="Profile"
              style={{ cursor: "default" }}
            />
          )}
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
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
        {posts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((post) => (
            <Post
              key={post._id}
              content={post.content}
              _id={post._id}
              createdAt={post.createdAt}
              liked={post.liked}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              postOwner={post.postOwner}
              onDelete={handleDeletePost}
            />
          ))}
      </div>
    </div>
  );
};

export default Posts;

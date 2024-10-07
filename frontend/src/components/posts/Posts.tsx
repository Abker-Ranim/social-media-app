import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import {
  createPost,
  getPosts,
  getPostsByUser,
  Post as PostType,
} from "../../services/post";
import "./posts.css";
import Post from "./post/Post";
import toast from "react-hot-toast";
import { useAuth } from "../../helpers/AuthProvider";
import { baseURL } from "../../api/axios";
import { MdAddPhotoAlternate } from "react-icons/md";

interface IProps {
  userId?: string;
}

const Posts = ({ userId }: IProps) => {
  const { auth } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const PictureRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = userId
          ? await getPostsByUser(userId)
          : await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handlePostSubmit = async () => {
    if (newPostContent.trim() || selectedImage) {
      const formData = new FormData();
      formData.append("content", newPostContent);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        const response = await createPost(formData);
        if (response.data && response.data.createdPost) {
          toast.success("Post Created Successfully");
          setPosts((prevPosts) => [...prevPosts, response.data.createdPost]);
        }
        setNewPostContent("");
        setSelectedImage(null);
      } catch (error) {
        toast.error("Error Creating Post. Please try again later.");
        console.error("Failed to create post:", error);
      }
    } else {
      console.warn("Post content or image is required");
    }
  };

  const handleDeletePost = (_id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== _id));
  };
  const handlPostPicture = () => {
    PictureRef.current?.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="posts">
      {auth?._id === userId ||
        (userId === undefined && (
          <div className="new_post">
            <div className="user_details">
              {auth && (
                <img
                  src={baseURL + "/" + auth?.profilePicture}
                  alt="Profile"
                  style={{ cursor: "default" }}
                />
              )}
              <h3>
                {auth?.firstName} {auth?.lastName}
              </h3>
            </div>

            <div className="textarea_with_image">
              {selectedImage && (
                <div className="image_in_textarea">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    
                  />
                </div>
              )}

              <textarea
                className="new_post_textbox"
                placeholder="What's in your mind..?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
            </div>

            <div className="button-container">
              <button
                className="navbar_profile_button"
                onClick={handlPostPicture}
              >
                <MdAddPhotoAlternate />
                <input
                  type="file"
                  ref={PictureRef}
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                />
              </button>
              <button
                className="navbar_profile_button"
                onClick={handlePostSubmit}
              >
                <FaPlus />
                <span className="text">Post</span>
              </button>
            </div>
          </div>
        ))}

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
              imageUrl={post.imageUrl}
              onDelete={handleDeletePost}
            />
          ))}
      </div>
    </div>
  );
};

export default Posts;

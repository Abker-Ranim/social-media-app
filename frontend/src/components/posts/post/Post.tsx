import "./post.css";
import { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaRegComment,
  FaEllipsisH,
  FaPaperPlane,
} from "react-icons/fa";
import { createLike, deleteLike, Like } from "../../../services/like";
import { formatDistanceToNow } from "date-fns";
import {
  Comment as CommentType,
  createComment,
  getCommentsByPostId,
} from "../../../services/comment";
import { updatePost, deletePost } from "../../../services/post";
import toast from "react-hot-toast";
import Comment from "./Comment";
import { User } from "../../../services/user";
import { useAuth } from "../../../helpers/AuthProvider";
import { baseURL } from "../../../api/axios";

interface PostProps {
  content: string;
  _id: string;
  createdAt: string;
  liked?: boolean;
  likesCount: number;
  commentsCount: number;
  postOwner: User;
  imageUrl: string;
  onDelete: (_id: string) => void;
}

const Post = ({
  content: initialContent,
  _id,
  createdAt,
  liked,
  commentsCount,
  likesCount,
  postOwner,
  imageUrl,
  onDelete,
}: PostProps) => {
  const { auth } = useAuth();

  const [content, setContent] = useState(initialContent);
  const [counts, setCounts] = useState({
    likes: likesCount,
    comments: commentsCount,
  });
  const [like, setLike] = useState(liked);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(content);

  const commentInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowOptions]);

  const postDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const handleLikeClick = async () => {
    if (!like) {
      const likeData: Like = { post: _id };
      try {
        await createLike(likeData);
        toast.success("Post Liked");
        setLike(true);
        setCounts((prevCounts) => ({
          ...prevCounts,
          likes: prevCounts.likes + 1,
        }));
      } catch (error) {
        toast.error("Error Creating Like. Please try again later.");
        console.error("Failed to create like:", error);
      }
    } else {
      try {
        await deleteLike(_id);
        toast.success("Post Disliked");
        setLike(false);
        setCounts((prevCounts) => ({
          ...prevCounts,
          likes: prevCounts.likes - 1,
        }));
      } catch (error) {
        toast.error("Error Deleting Like. Please try again later.");
        console.error("Failed to delete like:", error);
      }
    }
  };

  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      try {
        const newComment = { content: commentText, post: _id };
        await createComment(newComment);
        await fetchComments();
        toast.success("Comment Created Successfully");
        setCounts((prevCounts) => ({
          ...prevCounts,
          comments: prevCounts.comments + 1,
        }));
        setCommentText("");
        setShowComments(true);
      } catch (error) {
        toast.error("Error Creating Comment. Please try again later.");
        console.error("Failed to create comment:", error);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByPostId(_id);
      setComments(fetchedComments);
    } catch (error) {
      toast.error("Error Fetching Comments. Please try again later.");
      console.error("Failed to fetch comments:", error);
    }
  };

  const toggleComments = async () => {
    setShowComments((prevShowComments) => !prevShowComments);
    if (comments.length === 0) {
      await fetchComments();
    }
  };

  const handleEditPost = async () => {
    if (updatedPost.trim() !== content && updatedPost.trim() !== "") {
      try {
        await updatePost(_id, updatedPost);
        toast.success("Post Updated Successfully");
        setContent(updatedPost);
        setUpdatingPost(false);
      } catch (error) {
        toast.error("Error Updating Post. Please try again later.");
        console.error("Failed to update post:", error);
      }
    } else {
      setUpdatingPost(false);
    }
  };

  const handleCancelEditPost = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel updating? Any unsaved changes will be lost."
    );
    if (confirm) {
      setUpdatedPost(content);
      setUpdatingPost(false);
    }
  };

  const handleDeletePost = async () => {
    setShowOptions(false);
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDeletion) {
      try {
        await deletePost(_id);
        toast.success("Post Deleted Successfully");
        onDelete(_id);
      } catch (error) {
        toast.error("Error Deleting Post. Please try again later.");
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleDeleteComment = (_id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== _id)
    );
    setCounts((prevCounts) => ({
      ...prevCounts,
      comments: prevCounts.comments - 1,
    }));
  };

  return (
    <div className="post">
      <div className="post_user_details">
        {auth && (
          <img src={baseURL + "/" + postOwner?.profilePicture} alt="Profile" />
        )}
        <div className="user_name">
          <h4>
            {postOwner?.firstName} {postOwner?.lastName}
          </h4>
          <span>{postDate}</span>
        </div>
        {postOwner._id === auth?._id && (
          <div className="post_options">
            <FaEllipsisH onClick={() => setShowOptions((prev) => !prev)} />
            {showOptions && (
              <div className="options_menu" ref={dropdownRef}>
                <div
                  onClick={() => {
                    setUpdatingPost(true);
                    setShowOptions(false);
                  }}
                >
                  Update
                </div>
                <div onClick={handleDeletePost}>delete</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post_content_details">
        {updatingPost ? (
          <div className="edit_post">
            <textarea
              className="post_content"
              value={updatedPost}
              onChange={(e) => setUpdatedPost(e.target.value)}
              autoFocus
            />
            <div className="buttons">
              <button className="save" onClick={handleEditPost}>
                Save
              </button>
              <button className="cancel" onClick={handleCancelEditPost}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{content}</p>
            {imageUrl && (
              <img
                src={baseURL + "/" + imageUrl}
                alt="Post"
                className="post_image"
              />
            )}
          </>
        )}
      </div>

      <div className="post_actions">
        <div className="icon_info">
          <FaHeart
            className={`action_icon like_icon ${like ? "liked" : ""}`}
            onClick={handleLikeClick}
          />
          <span>{counts.likes}</span>
        </div>
        <div className="icon_info">
          <FaRegComment
            className="action_icon comment_icon"
            onClick={handleCommentIconClick}
          />
          <span>{counts.comments}</span>
        </div>
      </div>

      <button className="toggle_comments_button" onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && comments.length > 0 && (
        <div className="post_comments">
          {comments
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((comment) => (
              <Comment
                key={comment._id}
                content={comment.content}
                _id={comment._id}
                createdAt={comment.createdAt}
                onDelete={handleDeleteComment}
                commentOwner={comment.commentOwner}
              />
            ))}
        </div>
      )}
      <div className="comment_input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={handleCommentChange}
          ref={commentInputRef}
        />
        <button onClick={handleCommentSubmit}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Post;

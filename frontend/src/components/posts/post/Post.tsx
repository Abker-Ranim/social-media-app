import "./post.css";
import { useState, useRef } from "react";
import { FaHeart, FaRegComment, FaEllipsisH, FaPaperPlane, FaTrashAlt, FaEdit } from "react-icons/fa";
import { createLike, deleteLike, Like } from "../../../services/like";
import { formatDistanceToNow } from 'date-fns';
import { Comment, createComment, getCommentsByPostId, updateComment, deleteComment } from "../../../services/comment";
import { updatePost, deletePost } from "../../../services/post";

interface PostProps {
  content: string;
  _id: string;
  createdAt: string;
  liked?: boolean;
  likesCount: number;
  commentsCount: number;
  onDelete: (_id: string) => void;
}

const Post = ({ content: initialContent, _id, createdAt, liked, commentsCount, likesCount, onDelete }: PostProps) => {
  const [content, setContent] = useState(initialContent);
  const [counts, setCounts] = useState({ likes: likesCount, comments: commentsCount });
  const [like, setLike] = useState(liked);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const postDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const handleLikeClick = async () => {
    if (!like) {
      const likeData: Like = { post: _id };
      try {
        await createLike(likeData);
        setLike(true);
        setCounts(prevCounts => ({ ...prevCounts, likes: prevCounts.likes + 1 }));
      } catch (error) {
        console.error("Failed to create like:", error);
      }
    } else {
      try {
        await deleteLike(_id);
        setLike(false);
        setCounts(prevCounts => ({ ...prevCounts, likes: prevCounts.likes - 1 }));
      } catch (error) {
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
        setCounts(prevCounts => ({ ...prevCounts, comments: prevCounts.comments + 1 }));
        setCommentText("");
        setShowComments(true);
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByPostId(_id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const toggleComments = async () => {
    setShowComments(prevShowComments => !prevShowComments);
    if (!showComments) {
      await fetchComments();
    }
  };

  const handleEditPost = async () => {
    const updatedContent = prompt("Enter new content:", content);
    if (updatedContent && updatedContent.trim() !== "") {
      try {
        await updatePost(_id, updatedContent);
        setContent(updatedContent);
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    }
  };

  const handleDeletePost = async () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this post?");
    if (confirmDeletion) {
      try {
        await deletePost(_id);
        onDelete(_id);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleEditComment = async (commentId: string, currentContent: string) => {
    const updatedContent = prompt("Enter new content:", currentContent);
    if (updatedContent && updatedContent.trim() !== "") {
      try {
        await updateComment(commentId, updatedContent);
        setComments(prevComments =>
          prevComments.map(comment =>
            comment._id === commentId ? { ...comment, content: updatedContent } : comment
          )
        );
      } catch (error) {
        console.error("Failed to update comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDeletion) {
      try {
        await deleteComment(commentId);
        setComments(prevComments =>
          prevComments.filter(comment => comment._id !== commentId)
        );
        setCounts(prevCounts => ({ ...prevCounts, comments: prevCounts.comments - 1 }));
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  return (
    <div className="post">
      <div className="post_user_details">
        <img
          src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
          alt="User"
        />
        <div className="user_name">
          <h4>Ranim</h4>
          <span>{postDate}</span>
        </div>
        <div className="post_options">
          <FaEllipsisH onClick={() => setShowOptions(prev => !prev)} />
          {showOptions && (
            <div className="options_menu">
              <div onClick={handleEditPost}>Update</div>
              <div onClick={handleDeletePost}>delete</div>
            </div>
          )}
        </div>
      </div>

      <div className="post_content_details">
        <p>{content}</p>
      </div>

      <div className="post_actions">
        <div className="icon_info">
          <FaHeart
            className={`action_icon like_icon ${like ? 'liked' : ''}`}
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
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(comment => (
              <div key={comment._id} className="comment">
                <img
                  src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
                  alt="User"
                />
                <div className="info">
                  <div className="content">
                    <span className="user">{comment.commentOwner.firstName + " " + comment.commentOwner.lastName}</span>
                    <p className="text">{comment.content}</p>
                  </div>
                  <span className="date">{formatDistanceToNow(new Date(comment.createdAt))}</span>
                  <div className="comment_options">
                    <button className="edit" onClick={() => comment._id && handleEditComment(comment._id, comment.content)}> <FaEdit /></button>
                   
                    <button className="delete" onClick={() => comment._id && handleDeleteComment(comment._id)}><FaTrashAlt /></button>
                    
                  </div>
                </div>
              </div>
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

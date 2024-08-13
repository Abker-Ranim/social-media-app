import { FaPlus } from "react-icons/fa6";
import Post from "./post/Post";
import "./posts.css";

const Posts = () => {
    return (
        <>

            <div className="posts">
                <div className="new_post">
                    <div className="new_post_details">
                        <div className="new_post_profile_image">
                            <img src="" alt="" />
                        </div>
                        <div className="new_post_textbox">
                            <textarea placeholder="what's in your mind..?"></textarea>
                        </div>
                    </div>
                    <div className="new_post_buttons">
                        <button>
                            <FaPlus />

                        </button>
                    </div>
                </div>
                <div className="post_list"> <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>


            </div>


        </>
    );
}

export default Posts;
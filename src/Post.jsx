import { useState } from "react";
import "./Post.css";
import {executeGet, executePost} from "./DBAPI.js";

const Post = () => {
    const [postId, setPostId] = useState("1");
    const [postContent, setPostContent] = useState("בלה בלה בלה בלה בלה בלה בלה בלה");
    const [author, setAuthor] = useState("Admin");
    const [date, setDate] = useState("27/01/2026");
    const [likesign, setLikeSign] = useState(false);
    const [likes, setLikes] = useState(0);

    //צריך לסיים את הפונקציה הזו - היא לא עובדת עדיין מול השרת כמו שצריך
    const handleLike = async (postId) => {
        const url = `Like-Post?postid=${postId}`;
        await executePost(url, {});
        if (likesign) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLikeSign(!likesign);
    };

    return (
        <div className="post-container">
            <div className="post-card">
                <div className="post-header">
                    <span className="post-author">{author}</span>
                    <span className="post-date">{date}</span>
                </div>
                <div className="post-body">
                    <p>{postContent}</p>
                </div>

                {/* תצוגת מונה הלייקים */}
                <div className="post-stats">
                    {likes > 0 && <span>{likes} לייקים</span>}
                </div>

                <div className="post-footer">
                    <button
                        className={`post-button ${likesign ? "active-like" : ""}`}
                        onClick={() => handleLike(post.id)}
                    >
                        {likesign ? "👍 אהבתי" : "לייק"}
                    </button>
                    <button
                        className="post-button"
                        onClick={() => alert('This option is available to premium users only')}
                    >
                        תגובה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
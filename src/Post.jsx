import { useState } from "react";
import "./Post.css";
import {executeGet, executePost} from "./DBAPI.js";

const Post = ({data}) => {
    const [postId, setPostId] = useState(data.id);
    const [postContent, setPostContent] = useState(data.content);
    const [author, setAuthor] = useState(data.authorId);
    const [date, setDate] = useState(data.postDate);
    const [likesign, setLikeSign] = useState(false);
    const [likes, setLikes] = useState(0);


    //צריך לסיים את הפונקציה הזו - היא לא עובדת עדיין מול השרת כמו שצריך
    const handleLike = async () => {
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
                        onClick={() => handleLike()}
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
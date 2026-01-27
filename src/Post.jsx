import { useState } from "react";
import "./Post.css";

const Post = () => {
    const [postContent, setPostContent] = useState("בלה בלה בלה בלה בלה בלה בלה בלה");
    const [author, setAuthor] = useState("Admin");
    const [date, setDate] = useState("27/01/2026");

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
                <div className="post-footer">
                    <button className="post-button">לייק</button>
                    <button className="post-button">תגובה</button>
                </div>
            </div>
        </div>
    );
};

export default Post;
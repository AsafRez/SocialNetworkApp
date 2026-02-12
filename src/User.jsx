import React from 'react';
import {executePost,serverURL} from "./DBAPI.js";
import "./User.css"; // וודא שהקובץ מקושר

const User = ({userName, profile_image, currentUser, onAction}) => {
    const userFollowsCurrentUser = currentUser.following?.some(f => f.userName === userName);

    const handleFollowToggle = () => {
        const url = `Toggle-Follow?follower=${currentUser.userName}&following=${userName}`;
        executePost(url, {}).then(result => {
            if(result.success) {
                onAction();
            }
        });
    };

    return (
        <div className="single-user-card">
            <div className="user-details">
                <img
                    className="user-avatar"
                    src={`${serverURL}${profile_image}`}
                    alt={userName}
                />
                <span className="user-name-text">{userName}</span>
            </div>

            <button
                onClick={handleFollowToggle}
                className={`follow-btn ${userFollowsCurrentUser ? "is-following" : ""}`}
            >
                {userFollowsCurrentUser ? "הסר עוקב" : "עקוב"}
            </button>
        </div>
    );
}

export default User;
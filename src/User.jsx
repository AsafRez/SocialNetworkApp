import React from 'react';
import {executePost} from "./DBAPI.js";
import Dashboard from "./Dashboard.jsx";

const User = ({userName, profile_image, currentUser, onAction}) => {
    const userFollowsCurrentUser = currentUser.following?.some(f => f.userName === userName);

    return (
        <div className={"single-user"}>
            <div>
                <img
                    src={`http://localhost:8989${profile_image}`}
                    alt={userName}
                />
            </div>
            <div>
                <p style={{fontWeight: 'bold', margin: 0}}>
                    {userName}
                </p>
            </div>
            <div>
                <button onClick={() => {
                    const url = `Toggle-Follow?follower=${currentUser.userName}&following=${userName}`;
                    executePost(url, {}).then(result =>
                    {if(result.success){
                        onAction()}}
                    )
                }
                } className={`follow-button ${userFollowsCurrentUser ? "is-following" : ""}`}>
                    {userFollowsCurrentUser ? ("Unfollow") : "Follow"}
                </button>
            </div>
        </div>
    )
}

export default User;
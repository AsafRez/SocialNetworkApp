import './DashCSS.css'
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {executePost} from "./DBAPI.js";
import User from "./User.jsx";
import Profile from "./Profile.jsx";

const Dashboard=()=> {
    const [currentUser, setcurrentUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const token = Cookies.get("token");
            if (token) {
                const url = `Get-User-Profile`;
                console.log(url);
                try {
                    const res = await executePost(url,{});

                    console.log("Response from server:", res);
                    if (res.success) {
                        console.log("Successfully RElogged in");
                        setcurrentUser(res.user); // מעדכנים את ה-State
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
        };
        fetchProfile();

    },[]);
    return (
        <>
            <div>
                {currentUser ? (
                        <div className="dashboard-container">
                            <div className="profile-container">
                                <div>
                                    <Profile
                                        userName={currentUser.userName}
                                        profile_image={currentUser.profile_image}
                                        following={currentUser.followers ? currentUser.followers.length : 0}
                                        followers={currentUser.following ? currentUser.following.length : 0}
                                    />
                                    <User userName={currentUser.userName} profile_image={currentUser.profile_image}  />
                                </div>
                            </div>

                            <div className="post-container">
                                אזור מרכזי (הפוסטים)
                            </div>

                            <div className="folowers-container">
                                אזור העוקבים
                            </div>
                        </div>
                ) : (
                    <p>טוען נתונים...</p>
                )}
            </div>
        </>
    );
};
export default Dashboard;


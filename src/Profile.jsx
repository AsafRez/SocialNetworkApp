import './DashCSS.css'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {executePost} from "./DBAPI.js";
import User from "./User.jsx";

const Profile=()=> {
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
                <div className="dashboard-container">
                    <h1>הפרופיל שלי</h1>
                    {currentUser.userName ? (
                        <div className="profile-info">
                            <p>שלום, <strong>{currentUser.userName}</strong></p>
                            <img className="DashImage" src=
                                {`http://localhost:8989${currentUser.profile_image}`} alt="profile" />
                            <p>Followers: {currentUser.followers ? currentUser.followers.length : 0}</p>
                            <p>Following: {currentUser.following ? currentUser.following.length : 0}</p>
                            <div>
                                <User userName={currentUser.userName} profile_image={currentUser.profile_image}  />
                            </div>
                        </div>
                    ) : (
                        <p>טוען נתונים...</p>
                    )}
                </div>
            </>
        );
    };


export default Profile;


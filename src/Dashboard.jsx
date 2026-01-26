import './DashCSS.css'
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {executePost} from "./DBAPI.js";

const Dashboard=()=> {
    const location = useLocation();
        const [currentUser, setcurrentUser] = useState(location.state?.user || {});

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
        if(!currentUser) {
            fetchProfile();
        }
        },[]);
        return (
            <>
                {console.log(currentUser)}
                <div className="dashboard-container">
                    <h1>הפרופיל שלי</h1>
                    {console.log("התחלת בדיקה")}
                    { console.log(currentUser.userName)}
                    {currentUser.userName ? (
                        <div className="profile-info">
                            <p>שלום, <strong>{currentUser.userName}</strong></p>
                            {currentUser.profile_picture && <img className="DashImage" src={currentUser.profile_picture} alt="profile" />}
                            <p>Followers: {currentUser.followers ? currentUser.followers.length : 0}</p>
                            <p>Following: {currentUser.following ? currentUser.following.length : 0}</p>
                        </div>
                    ) : (
                        <p>טוען נתונים...</p>
                    )}
                </div>
            </>
        );
    };


export default Dashboard;


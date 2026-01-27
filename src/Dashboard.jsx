import './DashCSS.css'
import React, {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {executeGet, executePost} from "./DBAPI.js";
import Profile from "./Profile.jsx";
import UserList from "./UserList.jsx";
import Post from "./Post.jsx";

const Dashboard = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const [searchuser, setsearchuser] = useState("");
    const [filtered, setFiltered] = useState([]);
    const fetchProfile = useCallback(async () => {
            const token = Cookies.get("token");
            if (token) {
                const url = `Get-User-Profile`;
                console.log(url);
                try {
                    const res = await executePost(url, {});
                    if (res.success) {
                        console.log("Successfully RElogged in");
                        setcurrentUser(res.user)
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
        }
    )
    useEffect(() => {

        fetchProfile();
    }, []);

    useEffect(() => {
        const search = async () => {
            if (searchuser.length >= 2) {
                try {
                    const url = `Search-User?username=${encodeURIComponent(searchuser)}`;
                    const res = await executeGet(url);
                    setFiltered(Array.isArray(res) ? res : []);
                } catch (error) {
                    console.error("Search failed", error);
                    setFiltered([]);
                }
            } else {
                setFiltered([]);
            }
        };
        const timer = setTimeout(search, 300);
        return () => clearTimeout(timer);

    }, [searchuser]);

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
                                />

                            </div>
                            <input
                                value={searchuser}
                                onChange={(e) => setsearchuser(e.target.value)}
                                placeholder="חפש משתמש..."
                                type={"text"} className="searchUsers"
                            />


                            {searchuser.length >= 3 &&
                                <div>
                                    <UserList userList={filtered} onAction={fetchProfile} currentUser={currentUser}/>
                                </div>
                            }
                        </div>

                        <div className="post-container">
                            <Post></Post>
                        </div>

                        <div className="followers-container">
                            <div className="followings-section">
                                <h1>Your Following List:</h1>
                                <UserList userList={currentUser.following} currentUser={currentUser}
                                          onAction={fetchProfile}/>

                            </div>
                            <div className="follower-section">
                                <h1>Your Followers List:</h1>
                                <UserList userList={currentUser.followers} currentUser={currentUser}
                                          onAction={fetchProfile}/>
                            </div>
                        </div>
                    </div>

                ) : (
                    <p>טוען נתונים...</p>
                )

                }
            </div>
        </>

    )

}
export default Dashboard;

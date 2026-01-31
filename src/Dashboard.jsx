import './DashCSS.css'
import React, {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {executeGet, executePost} from "./DBAPI.js";
import Profile from "./Profile.jsx";
import UserList from "./UserList.jsx";
import Post from "./Post.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const [searchuser, setsearchuser] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [posts, setPosts] = useState([]);
    const fetchProfile = useCallback(async () => {
            const token = Cookies.get("token");
            if (token) {
                const url = `Get-User-Profile`;
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
    const navigate = useNavigate();
    const LogOut=()=>{
        setcurrentUser(null);
        setsearchuser("");
        Cookies.remove("token");
        navigate("/Login");
    }
    const getPosts=()=>{
        const url="Get-Following-Posts?numberToFetch=20";
        executeGet(url).then(res=>{
            setPosts(res.posts);
            console.log(res.posts);
        })
    }
    //צריך לסיים את הפונקציה הזו - היא לא עובדת עדיין מול השרת כמו שצריך
    // const fetchPosts = useCallback(async () => {
    //         const token = Cookies.get("token");
    //         if (token) {
    //             const url = `Get-posts`;
    //             console.log(url);
    //             try {
    //                 const res = await executePost(url, {});
    //                 if (res.success) {
    //                     setPosts(res)
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching posts:", error);
    //             }
    //         }
    //     }
    // )

    useEffect(() => {
        getPosts();
        fetchProfile();
    }, []);

    useEffect(() => {
        const search = async () => {
            if (searchuser.length >= 2) {
                try {
                    const url = `Search-User?username=${encodeURIComponent(searchuser)}`;
                    const res = await executeGet(url);
                    const data = Array.isArray(res) ? res : [];

                    const filteredResults = data.filter(user =>
                        !currentUser.following.some(followedUser => followedUser.id === user.id)
                    );

                    setFiltered(filteredResults);
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

    }, [searchuser,filtered]);

    return (
        <>
        <div className="dashboard-layout">
            {!currentUser ? (
                <div className="loading-state">טוען נתונים...</div>
            ) : (
                <>

                    {/* צד ימין: פרופיל וחיפוש */}
                    <aside className="sidebar-profile">
                        {/* חלק עליון קבוע - לא זז */}

                        <div className="profile-fixed-header">

                            <Profile
                                user={currentUser}
                                profile_image={currentUser.profile_image}
                                onProfileUpdate={fetchProfile}
                            />
                            <button onClick={()=>LogOut()}>להתנתק</button>

                        </div>


                        {/* חלק תחתון גמיש - גולל במידת הצורך */}
                        <div className="search-and-results">
                            <div className="search-wrapper">
                                <input
                                    value={searchuser}
                                    onChange={(e) => setsearchuser(e.target.value)}
                                    placeholder="חפש משתמש..."
                                    type="text"
                                    className="search-input"

                                />
                            </div>

                            {searchuser.length >= 3 && (
                                <div className="results-scroll-area">
                                    <UserList
                                        userList={filtered}
                                        onAction={fetchProfile}
                                        currentUser={currentUser}
                                    />
                                </div>
                            )}
                        </div>
                    </aside>
                    {/* מרכז: פיד פוסטים */}
                    <main className="feed-container">
                        {posts.map((post,index) => (
                            <Post data={post} key={index} />
                        ))}
                        {/* כאן אפשר להוסיף עוד פוסטים בעתיד */}
                    </main>

                    {/* צד שמאל: רשימות עוקבים */}
                    <aside className="sidebar-lists">
                        <div className="lists-card">
                            <section className="list-section">
                                <h2 className="section-title">Following</h2>
                                <UserList
                                    userList={currentUser.following}
                                    currentUser={currentUser}
                                    onAction={fetchProfile}
                                />
                            </section>

                            <hr className="section-divider" />

                            <section className="list-section">
                                <h2 className="section-title">Followers</h2>
                                <UserList
                                    userList={currentUser.followers}
                                    currentUser={currentUser}
                                    onAction={fetchProfile}
                                />
                            </section>
                        </div>
                    </aside>
                </>
            )}
        </div>
            <div className="copyright">
                © 2026 • Asaf Reznik • Dror Bashari • Evyatar Ridi • Segev Biton •
            </div>
    </>
    );

}
export default Dashboard;





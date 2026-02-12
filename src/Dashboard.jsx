import './DashCSS.css'
import React, {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {executeGet, executePost} from "./DBAPI.js";
import Profile from "./Profile.jsx";
import UserList from "./UserList.jsx";
import Post from "./Post.jsx";
import {useNavigate} from "react-router-dom";

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
        })
    }
    const handleRefreshData = useCallback(async () => {
        await fetchProfile();
        getPosts();
    }, [fetchProfile]);
    useEffect(() => {
        handleRefreshData();
    }, []);
    useEffect(() => {
        const search = async () => {
            // אם אין טקסט לחיפוש, פשוט מאפסים ויוצאים
            if (searchuser.length < 2) {
                setFiltered([]);
                return;
            }

            try {
                const url = `Search-User?username=${encodeURIComponent(searchuser)}`;
                const res = await executeGet(url);
                const data = Array.isArray(res) ? res : [];

                // סינון המשתמשים שכבר עוקבים אחריהם
                const filteredResults = data.filter(user =>
                    !currentUser.following.some(followedUser => followedUser.userName === user.userName)
                );

                setFiltered(filteredResults);
            } catch (error) {
                console.error("Search failed", error);
                setFiltered([]);
            }
        };

        const timer = setTimeout(search, 300);
        return () => clearTimeout(timer);
        }, [searchuser, currentUser]);

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
                                userName={currentUser.userName}
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
                                        onAction={handleRefreshData}
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
                                    userList={currentUser.following||[]}
                                    currentUser={currentUser}
                                    onAction={handleRefreshData}
                                />
                            </section>

                            <hr className="section-divider" />

                            <section className="list-section">
                                <h2 className="section-title">Followers</h2>
                                <UserList
                                    userList={currentUser.followers||[]}
                                    currentUser={currentUser}
                                    onAction={handleRefreshData}
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





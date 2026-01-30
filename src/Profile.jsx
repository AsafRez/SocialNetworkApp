import React from 'react';
import './Profile.css';
import Editprofile from "./Editprofile.jsx";

const Profile = ({ user, profile_image, openModal }) => {
    const[modal, setModal] = React.useState(false);
    return (
        <div className="profile-card">
            <h3 className="profile-title">הפרופיל שלי</h3>

            <div className="profile-image-wrapper">
                <img
                    className="profile-img"
                    src={`http://localhost:8989${profile_image}`}
                    alt={user.userName}
                />
                {/* כפתור צף לעריכת תמונה */}
                {/*<button*/}
                {/*    className="floating-edit-btn"*/}
                {/*    onClick={() => alert('edit picture')}*/}
                {/*    title="ערוך תמונה"*/}
                {/*>*/}
                {/*    ✎*/}
                {/*</button>*/}
            </div>

            <div className="profile-info">
                <p className="user-name">{user.userName}</p>
            </div>

            <div className="profile-actions">
                <button
                    className="change-password-btn"
                    onClick={() => setModal(true)}>

                    עריכת פרטים
                </button>
            </div>
            {modal && (
                <div className="profile-modal">
                    <Editprofile user={user} />
                </div>
            )}
        </div>
    );
};

export default Profile;
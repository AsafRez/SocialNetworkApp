import React from 'react';
import './Profile.css';

const Profile = ({ userName, profile_image, openModal }) => {
    return (
        <div className="profile-card">
            <h3 className="profile-title">הפרופיל שלי</h3>

            <div className="profile-image-wrapper">
                <img
                    className="profile-img"
                    src={`http://localhost:8989${profile_image}`}
                    alt={userName}
                />
                {/* כפתור צף לעריכת תמונה */}
                <button
                    className="floating-edit-btn"
                    onClick={() => openModal('edit picture')}
                    title="ערוך תמונה"
                >
                    ✎
                </button>
            </div>

            <div className="profile-info">
                <p className="user-name">{userName}</p>
            </div>

            <div className="profile-actions">
                <button
                    className="change-password-btn"
                    onClick={() => openModal('edit password')}
                >
                    שינוי סיסמה
                </button>
            </div>
        </div>
    );
};

export default Profile;
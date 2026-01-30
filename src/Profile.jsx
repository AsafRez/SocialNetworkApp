import React, { useRef } from 'react';
import './Profile.css';
import { executePost } from './DBAPI.js';
import {useNavigate} from "react-router-dom";
import updatePassword from "./UpdatePassword.jsx";

const Profile = ({ userName, profile_image, openModal }) => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // פתיחת חלון בחירת הקובץ
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // טיפול בבחירת קובץ ושליחה לשרת
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("username", userName);
        formData.append("photo", file);

        try {
            const response = await executePost("update-photo", formData);
            if (response.success) {
                alert("התמונה עודכנה בהצלחה!");
                window.location.reload(); // רענון כדי לראות את התמונה החדשה
            } else {
                alert("עדכון התמונה נכשל");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("שגיאה בתקשורת עם השרת");
        }
    };

    return (
        <div className="profile-card">
            <h3 className="profile-title">הפרופיל שלי</h3>

            <div className="profile-image-wrapper">
                <img
                    className="profile-img"
                    src={`https://social-server-47hl.onrender.com${profile_image}?t=${new Date().getTime()}`}
                    alt={userName}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {/* כפתור העריכה הצף */}
                <button
                    className="floating-edit-btn"
                    onClick={handleEditClick}
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
                    onClick={() => navigate("/UpdatePassword")}
                >
                    שינוי סיסמה
                </button>
            </div>
        </div>
    );
};

export default Profile;
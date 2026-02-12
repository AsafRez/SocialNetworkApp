import React, { useState } from 'react';
import { executePost } from './DBAPI.js';
import './PostModal.css'

const PostModal = ({ isOpen, onClose, userName }) => {
    const [postContent, setPostContent] = useState("");

    if (!isOpen) return null; // אם המודל סגור, אל תרנדר כלום

    const handlePublish = async () => {
        if (!postContent.trim()) return;
        try {
            const formData = new FormData();
            formData.append("content", postContent);
            const response =
                await executePost("Publish-Post", formData);

            if (response.success) {
                alert("הפוסט פורסם!");
                setPostContent(""); // איפוס
                onClose(); // סגירה
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>צור פוסט</h3>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>
                <textarea
                    placeholder={`מה על דעתך, ${userName}?`}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    autoFocus
                />
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>ביטול</button>
                    <button
                        className="btn-publish"
                        disabled={!postContent.trim()}
                        onClick={handlePublish}
                    >
                        פרסם
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
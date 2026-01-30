import React, { useState } from 'react';
import { executePost } from "./DBAPI.js";

const Editprofile=({user})=>{
    const [formData, setFormData] = useState({
        newUserName: user.userName,
        newPassword: "",
        RenewPassword: "",
        photolink: user.profile_image
    });
    const onSubmit =  async (e) => {
        e.preventDefault();
        const matchingPass=formData.newPassword ===formData.RenewPassword;
        const url="Update";
        if (matchingPass) {
            console.log(formData.photolink);
            const res = await executePost("Update", formData);
            if(res.success){
                    console.log(res);
                }
        }
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>עדכון פרטים</h2>
                <form onSubmit={onSubmit}>
                    <label>שם משתמש חדש:</label>
                    <input
                        type="text"
                        value={formData.newUserName}
                        onChange={(e) => setFormData({...formData, newUserName: e.target.value})}
                    />

                    <label>סיסמה חדשה (השאר ריק ללא שינוי):</label>
                    <input
                        type="password"
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                    <label>סיסמה בשנית:</label>
                    <input
                        type="password"
                        onChange={(e) => setFormData({...formData, RenewPassword: e.target.value})}
                    />

                    <label>קישור לתמונה:</label>
                    <input
                        type="text"
                        value={formData.photolink}
                        onChange={(e) => setFormData({...formData, photolink: e.target.value})}
                    />

                    <div className="modal-actions">
                        <button type="submit" className="save-btn">שמור שינויים</button>
                        <button type="button"  className="cancel-btn">ביטול</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editprofile;
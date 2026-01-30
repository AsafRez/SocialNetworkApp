import React, { useState } from 'react';
import {executePost} from './DBAPI.js';
import Cookies from "js-cookie";
import './App.css'
import {useNavigate} from "react-router-dom";

const UpdatePassword=(currnetusername)=>{
    const [username] = useState(currnetusername);
    const [curPassword, setcurPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setreNewPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [formComplete, setFormComplete] = useState(false);

    const navigate = useNavigate();
    function checkfromcomlete(){
        if (curPassword != null || reNewPassword != null || reNewPassword != null) {
            setFormComplete(true);
            return true;
        }
        return false;
    }


    return (
        <>
        <h1 >Change Password Screen </h1>

        <div className="login-container">
            <div className="login-box">
                <div className="input-group">
                    <input
                        type="password"
                        value={curPassword}
                        placeholder="Current Password"
                        onChange={e =>
                            setcurPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        value={newPassword}
                        placeholder="New Password"
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <input
                        type={"password"}
                        value={reNewPassword}
                        placeholder={"Repeat Password again PLZZZZ"}
                        onChange={e => setreNewPassword(e.target.value)}
                    />
                </div>
                <div className="exacute-button">
                    <button disabled={newPassword !== reNewPassword}
                            onClick={async () => {
                                if (newPassword.length > 3) {
                                    setErrorMessage("");

                                    const formData = new FormData();
                                    formData.append("username", username);
                                    formData.append("curpassword", curPassword);
                                    formData.append("newpassword", newPassword);

                                    const resultReg = await executePost("Change-password", formData);

                                    if (!resultReg.success) {
                                        setErrorMessage("Change-password failed");
                                    } else {
                                        setcurPassword("");
                                        setNewPassword("");
                                        setreNewPassword("");
                                        setErrorMessage("Change password complete");
                                        navigate("/Dashboard");
                                    }
                                } else {
                                    setErrorMessage("Invalid Info");
                                }
                            }}
                    >Change Password</button>
                    <button onClick={()=>
                        navigate("/Dashboard")
                    }>Cancel</button>
                </div>
                <div className="copyright">
                    © 2026 • Asaf Reznik • Dror Bashari • Evyatar Ridi • Segev Biton •
                </div>
            </div>
            </div>
        </>
    );
};

export default UpdatePassword;


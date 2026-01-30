import React, { useState } from 'react';
import {executeGet,executePost} from './DBAPI.js';
import Cookies from "js-cookie";
import './App.css'
import {useNavigate} from "react-router-dom";

const Register=()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [imageURL, setimageURL] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="login-container">
        <div className="login-box">
            <div className="input-group">
                <input value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <input
                    type={"password"}
                    placeholder={"Repeat Password again PLZZZZ"}
                    value={repassword}
                    onChange={e => {setRepassword(e.target.value)}
                    }
                />
                <input
                    placeholder={"upload picture PLZZZZ"}
                    type="file"
                    accept="image/*"
                    onChange={e => setSelectedFile(e.target.files[0])}
                />
                {/*<input*/}
                {/*    placeholder={"input picture link PLZZZZ"}*/}
                {/*    value={imageURL}*/}
                {/*    onChange={e => {setimageURL(e.target.value)}*/}
                {/*    }*/}
                {/*/>*/}
            </div>
            <div className="exacute-button">
                <button disabled={password !== repassword}
                        onClick={async () => {
                            if (username.length > 3 && password.length > 3) {
                                setErrorMessage("");

                                // יצירת FormData - זה הכרחי להעלאת קבצים
                                const formData = new FormData();
                                formData.append("username", username);
                                formData.append("password", password);
                                if (selectedFile) {
                                    formData.append("photo", selectedFile);
                                }
                                // שימוש ב-executePost שיצרת ב-API
                                const resultReg = await executePost("register", formData);

                                if (!resultReg.success) {
                                    setErrorMessage("Register failed");
                                } else {
                                    // איפוס טופס
                                    setSelectedFile(null);
                                    setRepassword("");
                                    setPassword("");
                                    setUsername("");
                                    setErrorMessage("Register complete");
                                    navigate("/Login");
                                }
                            } else {
                                setErrorMessage("Invalid Info");
                            }
                        }}
                        // onClick={async()=>
                        // {
                        //     if(username.length===0 || password.length===0){
                        //         setErrorMessage("Missing Info");
                        //     }else if(username.length>3 && password.length >3){
                        //         setErrorMessage("");
                        //         const registerData = `register?username=${username}&password=${password}&photolink=${imageURL}`;
                        //         const resultReg = await executeGet(registerData);
                        //         if (!resultReg.success) {
                        //             setErrorMessage("Register failed");
                        //         } else {
                        //             setimageURL("");
                        //             setRepassword("");
                        //             setPassword("");
                        //             setUsername("");
                        //             setErrorMessage("Register complete");
                        //
                        //         }
                        //     }else{
                        //         setErrorMessage("Wrong Info");
                        //     }
                        //}}

                >Register</button>
                <button onClick={()=>
                    navigate("/Login")
                }>Need to Login?</button>
                {ErrorMessage && <p>{ErrorMessage}</p>}
            </div>
            <div className="copyright">
                © 2026 • Asaf Reznik • Dror Bashari • Evyatar Ridi • Segev Biton •
            </div>
        </div>
        </div>
    );
};

export default Register;


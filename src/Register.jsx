import React, { useState } from 'react';
import {executeGet} from './DBAPI.js';
import Cookies from "js-cookie";
import './App.css'
import {useNavigate} from "react-router-dom";

const Register=()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [imageURL, setimageURL] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    return (
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
                    placeholder={"input picture link PLZZZZ"}
                    value={imageURL}
                    onChange={e => {setimageURL(e.target.value)}
                    }
                />
            </div>
            <div className="ExacuteButton">
                <button disabled={username === null || password === null}
                        onClick={async()=>
                        {
                            if(username.length===0 || password.length===0){
                                setErrorMessage("Missing Info");
                            }else if(username.length>3 && password.length >3){
                                setErrorMessage("");
                                const registerData = `register?username=${username}&password=${password}&photolink=${imageURL}`;
                                const resultReg = await executeGet(registerData);
                                if (!resultReg.success) {
                                    setErrorMessage("Register failed");
                                } else {
                                    setimageURL("");
                                    setRepassword("");
                                    setPassword("");
                                    setUsername("");
                                    setErrorMessage("Register complete");

                                }
                            }else{
                                setErrorMessage("Wrong Info");
                            }
                        }
                        }
                >Register</button>
                <button onClick={()=>
                    navigate("/Login")
                }>Need to Login?</button>
                {ErrorMessage && <p>{ErrorMessage}</p>}
            </div>
        </div>
    );
};

export default Register;


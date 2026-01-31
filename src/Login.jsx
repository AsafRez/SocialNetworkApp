import React, { useState } from 'react';
import {executeGet} from './DBAPI.js';
import Cookies from "js-cookie";
import './App.css'
import { useNavigate} from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    return (
        <div className="login-container">
        <div className="login-box">
            <div className="input-group">
            <input value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </div>
            <div className="exacute-button">
            <button disabled={username === null || password === null}
                    onClick={async()=>
                    {
                        if(username.length===0 || password.length===0){
                            setErrorMessage("Missing Info");
                        }else if(username.length>3 && password.length >3){
                            setErrorMessage("");
                            const loginData = `Login?username=${username}&password=${password}`;
                            const resultLogin = await executeGet(loginData);
                            if (!resultLogin.success) {
                                setErrorMessage("Login failed");
                            } else {
                                Cookies.set("token", resultLogin.token, {
                                    expires: 1,
                                    sameSite: 'None',
                                    secure: true
                                });
                                setUsername("");
                                setPassword("");
                                setErrorMessage("Login good");
                                navigate("/Dashboard");
                            }
                        }else{
                            setErrorMessage("Wrong Info");
                        }
                    }
                    }
            >Login</button>
            <button onClick={()=>navigate("/register")
            }>Need to Register?</button>
            {ErrorMessage && <p className="Error">{ErrorMessage}</p>}
            </div>

            <div className="copyright">
                © 2026 • Asaf Reznik • Dror Bashari • Evyatar Ridi • Segev Biton •
            </div>
        </div>
        </div>




    );
}

export default Login;


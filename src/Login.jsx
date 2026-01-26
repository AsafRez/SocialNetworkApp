import React, { useState } from 'react';
import { execute } from './DBAPI.js';
import Cookies from "js-cookie";
import './App.css'
import {BrowserRouter, useNavigate} from "react-router-dom";
import App from "./App.jsx";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    return (
        <div className="login-box">
            <div className="input-group">
            <input value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </div>
            <div className="ExacuteButton">
            <button disabled={username === null || password === null}
                    onClick={async()=>
                    {
                        if(username.length===0 || password.length===0){
                            setErrorMessage("Missing Info");
                        }else if(username.length>3 && password.length >3){
                            setErrorMessage("");
                            const loginData = `Login?username=${username}&password=${password}`;
                            const resultLogin = await execute(loginData);
                            if (!resultLogin.success) {
                                setErrorMessage("Login failed");
                            } else {
                                Cookies.set("token", resultLogin.token, {expires: 1});
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

            <div>
            </div>
        </div>




    );
};

export default Login;


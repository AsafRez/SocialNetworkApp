import {useState} from 'react'
import './App.css'
import React from 'react'
import axios from 'axios'
import Cookies from "js-cookie";

function App() {
    const serverURL = 'http://localhost:8989/';
    const execute = async (url) => {
        const res = await axios.get(serverURL + url);
        return res.data;
    };

    const [loginscreen, setloginscreen] = useState("Login");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [repeatpassword, setrepeatpassword] = useState("");
    const [imageURL, setimageURL] = useState("");
    const [OTSCode, setOTSCode] = useState("");
    const [loginErrorMessage, setloginErrorMessage] = useState("");


    function clearData (){
            setusername("");
            setpassword("");
            setrepeatpassword("");
            setimageURL("");
            setOTSCode("");
            setloginErrorMessage("");
    }

    return (
        <>
        <div className="login-container">
            <h2>{loginscreen}</h2>

            <div className="mode-switch">
                <button disabled={loginscreen === "Register"} onClick={e => {
                    setloginscreen("Register");
                    clearData();
                }}>
                    Set Register Mode
                </button>
                <button disabled={loginscreen === "Login" || loginscreen === "OTP"} onClick={e => {
                    setloginscreen("Login");
                    clearData();
                }}>
                    Set Login Mode
                </button>
            </div>
        </div>

    <div className="input-group">
            <div className="input">
                <input
                    disabled={loginscreen === "OTP"}
                    placeholder={"Input Username PLZZZZ"}
                    value={username}
                    onChange={e => {setusername(e.target.value)}
                }
                />
                <input
                    type={"password"}
                    disabled={loginscreen === "OTP"}
                    placeholder={"Input Password PLZZZZ"}
                    value={password}
                    onChange={e => {setpassword(e.target.value)}
                }
                />
            </div>
            {(loginscreen === "Register") && (
                    <>
                        <input
                            type={"password"}
                            disabled={loginscreen === "OTP"}
                            placeholder={"Repeat Password again PLZZZZ"}
                            value={repeatpassword}
                            onChange={e => {setrepeatpassword(e.target.value)}
                            }
                        />
                        <input
                            placeholder={"input picture link PLZZZZ"}
                            value={imageURL}
                            onChange={e => {setimageURL(e.target.value)}
                            }
                        />
                    </>
               )
            }

            {(loginscreen === "OTP") && (
                    <input
                        placeholder={"Input OTP PLZZZZ"}
                        onChange={e => {setOTSCode(e.target.value)}
                        }
                    />
                )
            }
        {loginErrorMessage.length!=0 && (
            <div className="loginErrorMessage">
                {loginErrorMessage}
            </div>
        )}

    </div>

    <div className="ExacuteButton">
        {(loginscreen === "Login") ?
            (<button
                disabled={username === null || password === null}
                onClick={async()=>
                    {
                        if(username.length===0 || password.length===0){
                            setloginErrorMessage("Missing Info");
                        }else if(username.length>3 && password.length >3){
                            setloginErrorMessage("");
                            const loginData = `Login?username=${username}&password=${password}`;
                            const resultLogin = await execute(loginData);
                            if (!resultLogin.success) {
                                setloginErrorMessage("Login failed");
                            } else {
                                clearData();
                                console.log(resultLogin.token);
                                Cookies.set("token", resultLogin.token, {expires: 1});
                                console.log(Cookies.get("token"));
                                setloginErrorMessage("s");
                            }
                        }else{
                            setloginErrorMessage("Wrong Info");
                        }
                    }
            }
            >
                Login
            </button>)
            :
            (loginscreen === "Register" ?
            (<button
                disabled={(password !== repeatpassword || !password) && (username==null || password==null)}
                onClick={async () => {
                    if(repeatpassword !== password){
                        setloginErrorMessage("Not matching Passwords");
                    }else if (username >= 4 && password >= 4) {
                        const regData = `register?username=${username}&password=${password}&photolink=${imageURL}`;
                        const resultRegister = await execute(regData);
                        console.log(resultRegister);
                        if (!resultRegister.success) {
                            setloginErrorMessage("register Failed");
                        } else {
                            clearData();

                        }
                    }
                else{
                    setloginErrorMessage("Register Failed too short info");
                }
            }
                }>
            Register
            </button>)
            :
            (loginscreen === "OTP" &&
                <button>OTP</button>)
                )
        }

    </div>
</>
    )
            }



export default App;

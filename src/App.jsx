import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";
import './App.css'
import Dashboard from "./Dashboard.jsx";

function App() {

    return (
        <div className="app-container">
            <header className="header-container">
                <h1 className="header-title">The Social <span>Network :D</span></h1>
            </header>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
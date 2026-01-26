import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import './App.css'

function App() {

    return (
        <div className="app-container">
            <h1>The Social NetWork :D</h1>

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
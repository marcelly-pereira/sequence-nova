import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './app/BaseLayout';
import Home from './app_user/Home';
import Login from './app_user/Login';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<BaseLayout />}>
                    <Route index element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
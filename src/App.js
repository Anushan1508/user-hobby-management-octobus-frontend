// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import Login from './components/Login/Login';
import HobbieList from './components/Hobbies/HobbieList';
import Cookies from 'js-cookie'; // Import js-cookie

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the 'authenticated' cookie exists
        const isAuthenticatedCookie = Cookies.get('authenticated') === 'true';
        setAuthenticated(isAuthenticatedCookie);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route
                    path="/"
                    element={authenticated ? <UserList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/hobbies"
                    element={authenticated ? <HobbieList /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;

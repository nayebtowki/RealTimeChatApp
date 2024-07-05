import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <ChatRoom chatRoom="general" />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

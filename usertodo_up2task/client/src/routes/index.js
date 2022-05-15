
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "../Pages/user";
import Index from "../Pages/";
import Footer from "../component/footer";
import Header from '../component/Header';
import Register from "../Pages/auth/register"
import Login from "../Pages/auth/login"
import Password from "../Pages/user/Password";
import Profile from "../Pages/user/profile"
import Forgot from "../Pages/user/forgot";
import ResetPassword from "../Pages/user/resetpassword";

const IndexRoute = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Password" element={<Password />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/resetpassword/:token" element={<ResetPassword />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default IndexRoute

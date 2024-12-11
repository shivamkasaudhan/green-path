import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSelector from '../component/languageSelector';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const Navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/adminlogin', { email, password });
            setSuccess(response.data.message);
            toast.success("Login Successfull.")
            setTimeout(()=>{
                window.location.href='http://localhost:3001';
            },1000)
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError('An error occurred. Please try again.');
            }
            toast.error("Login Failed");
        }
    };

    return (
        
        <div className="flex items-center justify-center  ">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
                {error && (
                    <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 text-green-600 bg-green-100 p-3 rounded-lg">
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

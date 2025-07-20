import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', formData)
            localStorage.setItem('auth_token', response.data.access_token)
            navigate('/towing-requests') 
            
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
            style={{
                backgroundImage: "url(/images/background.png)"
            }}
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Login to Tareeqk</h1>
                    <p className="mt-2 text-gray-600">
                        Access your customer account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#fdb633ff] focus:ring-[#fdb633ff]"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#fdb633ff] focus:ring-[#fdb633ff]"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-black bg-[#fdb633ff] rounded-md hover:bg-[#ffa401] duration-200 transition-colors pointer cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-yellow-600 hover:text-yellow-700">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
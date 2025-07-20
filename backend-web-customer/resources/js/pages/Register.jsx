import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/register', formData)
            setSuccessMessage(response.data.message)
            setTimeout(() => navigate('/login'), 2000);

            setErrorMessage('')
        } catch (err) {
            setErrorMessage(err.response.data.errors)
            setSuccessMessage('')
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
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="mt-2 text-gray-600">
                        Join Tareeqk today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#fdb633ff] focus:ring-[#fdb633ff]"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#fdb633ff] focus:ring-[#fdb633ff]"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#fdb633ff] focus:ring-[#fdb633ff]"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength="8"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-black bg-[#fdb633ff] rounded-md hover:bg-[#ffa401] duration-200 transition-colors pointer cursor-pointer"
                    >
                        Register
                    </button>
                </form>
                {successMessage && <p className='text-green-700'>{successMessage}, Redirecting to Login.</p>}
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                <p className="text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-700">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
            style={{
                backgroundImage: "url(/images/background.png)"
            }}
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Tareeqk!</h1>
                    <p className="mt-2 text-gray-600">
                        Please login or register to access your dashboard.
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 text-black bg-[#fdb633ff] rounded-md hover:bg-[#ffa401] duration-200 transition-colors cursor-pointer"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-4 py-2 text-black bg-white border border-[#fdb633ff] rounded-md hover:bg-[#ffa60123] duration-200 transition-colors cursor-pointer"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
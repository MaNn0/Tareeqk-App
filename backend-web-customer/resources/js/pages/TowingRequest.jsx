import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TowingRequest() {
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        location: '',
        note: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('/api/requests', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRequests(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch requests');
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post('/api/requests', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRequests(prev => [response.data, ...prev]);
            setFormData({ customer_name: '', phone: '', location: '', note: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create request');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
        </div>
    );

    if (error) return <div className='flex justify-center items-center h-screen'>Error: {error}</div>;

    return (
        <div className='min-h-screen bg-gray-200'>
            <div className="container mx-auto p-4">
                <div className='flex justify-between mb-5'>
                    <h1 className="text-2xl font-bold">Towing Requests</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transitions-color duration-200 cursor-pointer"
                    >
                        <span>Logout</span>
                    </button>
                </div>

                {/* Create Request Form */}
                <div className="mb-8 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">New Request</h2>
                    <form onSubmit={handleCreateRequest}>
                        <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            placeholder="Customer Name"
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Phone Number"
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Location"
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <textarea
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            placeholder="Note"
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>

                {/* Requests List */}
                <div className="space-y-6">
                    {requests.map(request => (
                        <div
                            key={request.id}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Request #{request.id}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {request.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium text-gray-800">Customer:</span> {request.customer_name}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium text-gray-800">Location:</span> {request.location}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium text-gray-800">Note:</span> {request.note}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Created: {new Date(request.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, Users, Droplet, TrendingUp } from "lucide-react";

function AdminDashboard() {
    const [donations, setDonations] = useState([]);
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });

    useEffect(() => {
        fetchDonations();
        const interval = setInterval(fetchDonations, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const pending = donations.filter(d => d.status === 'pending').length;
        const approved = donations.filter(d => d.status === 'approved').length;
        const rejected = donations.filter(d => d.status === 'rejected').length;
        setStats({ pending, approved, rejected, total: donations.length });
    }, [donations]);

    async function fetchDonations() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDonations(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function updateStatus(id, status) {
        try {
            const endpoint = status === "approved" 
                ? `${process.env.REACT_APP_API_URL}/api/blood-donation/${id}/approve`
                : `${process.env.REACT_APP_API_URL}/api/blood-donation/${id}/reject`;

            const res = await fetch(endpoint, {
                method: "PUT",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (res.ok) {
                alert(`✅ Donation ${status}!`);
                fetchDonations();
            }
        } catch (err) {
            alert("❌ Failed to update status");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage blood donation requests</p>
                        </div>
                        <button onClick={fetchDonations} className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md">
                            <RefreshCw size={20} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                        <Users size={32} className="mb-3" />
                        <p className="text-blue-100 text-sm">Total Requests</p>
                        <p className="text-4xl font-bold">{stats.total}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
                        <Clock size={32} className="mb-3" />
                        <p className="text-yellow-100 text-sm">Pending</p>
                        <p className="text-4xl font-bold">{stats.pending}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                        <CheckCircle size={32} className="mb-3" />
                        <p className="text-green-100 text-sm">Approved</p>
                        <p className="text-4xl font-bold">{stats.approved}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                        <XCircle size={32} className="mb-3" />
                        <p className="text-red-100 text-sm">Rejected</p>
                        <p className="text-4xl font-bold">{stats.rejected}</p>
                    </div>
                </div>

                {/* Donations Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Recent Donations</h2>
                    </div>
                    {donations.length === 0 ? (
                        <div className="text-center py-16">
                            <Droplet size={64} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">No donation requests found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Donor</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Blood Group</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hospital</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {donations.map(donation => (
                                        <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{donation.donorName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                                                    <Droplet size={14} className="mr-1" />
                                                    {donation.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(donation.donationDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{donation.hospital}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                                    donation.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    donation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {donation.status === 'approved' && <CheckCircle size={14} className="mr-1" />}
                                                    {donation.status === 'rejected' && <XCircle size={14} className="mr-1" />}
                                                    {donation.status === 'pending' && <Clock size={14} className="mr-1" />}
                                                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {donation.status === 'pending' ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => updateStatus(donation._id, 'approved')}
                                                            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium shadow-sm"
                                                        >
                                                            <CheckCircle size={16} />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(donation._id, 'rejected')}
                                                            className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium shadow-sm"
                                                        >
                                                            <XCircle size={16} />
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Processed</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

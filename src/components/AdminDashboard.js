import { useState, useEffect } from "react";

function AdminDashboard() {
    const [donations, setDonations] = useState([]);
    const [newRequests, setNewRequests] = useState(0);

    useEffect(() => {
        fetchDonations();
        //  Har 30 seconds par naye requests check karo
        const interval = setInterval(fetchDonations, 30000);
        return () => clearInterval(interval);
    }, []);

    async function fetchDonations() {
        try {
            console.log("Fetching donations...");
            const token = localStorage.getItem("token");
            console.log("Token:", token); // ✅ Token check karo

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation/admin/all`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("Response status:", res.status); // ✅ Status check karo

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Donations data:", data); // ✅ Data check karo

            setDonations(data);
            const newCount = data.filter(d => d.status === 'pending' && !d.adminViewed).length;
            setNewRequests(newCount);
        } catch (err) {
            console.error("Error fetching donations:", err);
            alert("Failed to load donation requests: " + err.message);
        }
    }

    async function updateStatus(id, status) {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation/admin/update-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ status })
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            const result = await res.json();
            alert("Status updated successfully!");
            fetchDonations(); // Refresh list
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blood Donation Requests</h2>
                {newRequests > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        {newRequests} New Request{newRequests !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {donations.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No donation requests found</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left border-b font-semibold">Donor Name</th>
                                <th className="p-3 text-left border-b font-semibold">Email</th>
                                <th className="p-3 text-left border-b font-semibold">Blood Group</th>
                                <th className="p-3 text-left border-b font-semibold">Donation Date</th>
                                <th className="p-3 text-left border-b font-semibold">Location</th>
                                <th className="p-3 text-left border-b font-semibold">Status</th>
                                <th className="p-3 text-left border-b font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(donation => (
                                <tr key={donation._id} className="hover:bg-gray-50 border-b">
                                    <td className="p-3">{donation.donorName}</td>
                                    <td className="p-3">{donation.donorEmail}</td>
                                    <td className="p-3">
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                            {donation.bloodGroup}
                                        </span>
                                    </td>
                                    <td className="p-3">{new Date(donation.donationDate).toLocaleDateString()}</td>
                                    <td className="p-3">{donation.location}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${donation.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            donation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex space-x-2">
                                            {donation.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(donation._id, 'approved')}
                                                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(donation._id, 'rejected')}
                                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {donation.status !== 'pending' && (
                                                <span className="text-gray-400 text-sm">Processed</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Refresh Button */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={fetchDonations}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
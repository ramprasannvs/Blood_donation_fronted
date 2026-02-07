import { useState, useEffect } from "react";

function AdminDashboard() {
    const [donations, setDonations] = useState([]);
    const [newRequests, setNewRequests] = useState(0);

    useEffect(() => {
        fetchDonations();

        // har 30 sec refresh
        const interval = setInterval(fetchDonations, 30000);
        return () => clearInterval(interval);
    }, []);

    /* ================= FETCH ALL DONATIONS (ADMIN) ================= */
    async function fetchDonations() {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/blood-donation`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setDonations(data);

            const pendingCount = data.filter(
                (d) => d.status === "pending"
            ).length;
            setNewRequests(pendingCount);
        } catch (err) {
            console.error("Error fetching donations:", err);
            alert("Failed to load donation requests");
        }
    }

    /* ================= APPROVE / REJECT ================= */
    async function updateStatus(id, status) {
        try {
            const token = localStorage.getItem("token");

            const endpoint =
                status === "approved"
                    ? `${process.env.REACT_APP_API_URL}/api/blood-donation/${id}/approve`
                    : `${process.env.REACT_APP_API_URL}/api/blood-donation/${id}/reject`;

            const res = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            alert(`Donation ${status}`);
            fetchDonations();
        } catch (err) {
            console.error("Update status error:", err);
            alert("Failed to update donation status");
        }
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blood Donation Requests</h2>

                {newRequests > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        {newRequests} New Request{newRequests > 1 ? "s" : ""}
                    </span>
                )}
            </div>

            {/* TABLE */}
            {donations.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No donation requests found</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left border-b">Donor Name</th>
                                <th className="p-3 text-left border-b">Blood Group</th>
                                <th className="p-3 text-left border-b">Donation Date</th>
                                <th className="p-3 text-left border-b">Hospital</th>
                                <th className="p-3 text-left border-b">Status</th>
                                <th className="p-3 text-left border-b">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {donations.map((donation) => (
                                <tr
                                    key={donation._id}
                                    className="hover:bg-gray-50 border-b"
                                >
                                    <td className="p-3">{donation.donorName}</td>

                                    <td className="p-3">
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                            {donation.bloodGroup}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {new Date(
                                            donation.donationDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">{donation.hospital}</td>

                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${donation.status === "approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : donation.status === "rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {donation.status}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {donation.status === "pending" ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        updateStatus(donation._id, "approved")
                                                    }
                                                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(donation._id, "rejected")
                                                    }
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Processed
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* REFRESH */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={fetchDonations}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]); // ✅ Certificate state

    // ✅ load user from localStorage
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     } else {
    //         navigate("/login");
    //     }
    // }, [navigate]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Invalid user in localStorage", err);
                localStorage.removeItem("user");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);


    // ✅ Fetch certificates when certificates tab is active
    useEffect(() => {
        if (activeTab === "certificates" && user) {
            fetchCertificates();
        }
    }, [activeTab, user]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    // Fetch certificates function
    async function fetchCertificates() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation/certificates/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setCertificates(data);
            } else {
                console.log("No certificates found");
            }
        } catch (err) {
            console.error("Error fetching certificates:", err);
        }
    }

    // Blood Donation Submit
    async function handleBloodSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    bloodGroup: data.bloodGroup,
                    donationDate: data.date,
                    location: data.location
                }),
            });

            const result = await res.json();

            if (res.ok) {
                alert("✅ Blood donation submitted for approval!");
                setActiveTab("dashboard");
            } else {
                alert("❌ " + result.msg);
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Backend connection failed! Check if server is running on port 8080");
        }
    }

    // Money Donation Submit
    async function handleMoneySubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/money-donation/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    amount: data.amount,
                    purpose: data.purpose
                }),
            });

            const result = await res.json();

            if (res.ok) {
                alert("✅ Money donation submitted successfully!");
                setActiveTab("dashboard");
            } else {
                alert("❌ " + result.msg);
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Something went wrong!");
        }
    }

    // Download Certificate function
    const downloadCertificate = (certificate) => {
        // ✅ Create a simple PDF download
        const certificateContent = `
            BLOOD DONATION CERTIFICATE
            ==========================
            
            Certificate ID: ${certificate.certificateId}
            Donor Name: ${certificate.donorName}
            Blood Group: ${certificate.bloodGroup}
            Donation Date: ${new Date(certificate.donationDate).toLocaleDateString()}
            Issued Date: ${new Date(certificate.issuedDate).toLocaleDateString()}
            
            This certificate is awarded to ${certificate.donorName}
            for their noble act of blood donation.
            
            Thank you for saving lives!
            
            Caredrop Foundation
            ${new Date().getFullYear()}
        `;

        const blob = new Blob([certificateContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate-${certificate.certificateId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-6 space-y-4">
                <h2 className="font-bold text-lg">Menu</h2>
                <button
                    onClick={() => setActiveTab("bloodDonate")}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                    Blood Donation
                </button>
                <button
                    onClick={() => setActiveTab("moneyDonate")}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                    Money Donation
                </button>
                <button
                    onClick={() => setActiveTab("certificates")}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                    Certificates
                </button>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-100"
                >
                    Logout
                </button>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-8 bg-white">
                <h1 className="text-2xl font-bold mb-6">
                    Welcome, {user?.name || "Guest"} 👋
                </h1>

                {/* ---- Dashboard ---- */}
                {activeTab === "dashboard" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-red-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-red-600 mb-2">Blood Donation</h3>
                            <p className="text-gray-700 mb-4">
                                Register your blood donation securely.
                            </p>
                            <button
                                onClick={() => setActiveTab("bloodDonate")}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                            >
                                Donate Now
                            </button>
                        </div>

                        <div className="bg-orange-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-orange-600 mb-2">Money Donation</h3>
                            <p className="text-gray-700 mb-4">Support with online contribution.</p>
                            <button
                                onClick={() => setActiveTab("moneyDonate")}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-400"
                            >
                                Donate Money
                            </button>
                        </div>

                        <div className="bg-green-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-green-600 mb-2">Certificates</h3>
                            <p className="text-gray-700 mb-4">
                                Download your donation certificates.
                            </p>
                            <button
                                onClick={() => setActiveTab("certificates")}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                            >
                                View
                            </button>
                        </div>
                    </div>
                )}

                {/* ---- Blood Donation Form ---- */}
                {activeTab === "bloodDonate" && (
                    <form
                        onSubmit={handleBloodSubmit}
                        className="max-w-lg mx-auto bg-gray-50 shadow-md rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-center mb-4">Blood Donation Form</h2>

                        <select
                            name="bloodGroup"
                            required
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <input
                            type="date"
                            name="date"
                            required
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Hospital / Blood Bank"
                            required
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* ---- Money Donation Form ---- */}
                {activeTab === "moneyDonate" && (
                    <form
                        onSubmit={handleMoneySubmit}
                        className="max-w-lg mx-auto bg-gray-50 shadow-md rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-center mb-4">Money Donation Form</h2>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount (₹)"
                            required
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        />
                        <input
                            type="text"
                            name="purpose"
                            placeholder="Purpose (Optional)"
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-400"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* ---- Certificates ---- */}
                {activeTab === "certificates" && (
                    <div className="max-w-4xl mx-auto bg-gray-50 shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center">Your Certificates</h2>

                        {certificates.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No certificates found. Your approved donations will appear here.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {certificates.map(cert => (
                                    <div key={cert._id} className="bg-white p-6 rounded-lg shadow border border-green-200">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-800">Blood Donation Certificate</h3>
                                                <p className="text-sm text-gray-600">ID: {cert.certificateId}</p>
                                                <p className="mt-2">Donor: <span className="font-medium">{cert.donorName}</span></p>
                                                <p>Blood Group: <span className="font-medium">{cert.bloodGroup}</span></p>
                                                <p>Donation Date: <span className="font-medium">
                                                    {new Date(cert.donationDate).toLocaleDateString()}
                                                </span></p>
                                                <p>Issued Date: <span className="font-medium">
                                                    {new Date(cert.issuedDate).toLocaleDateString()}
                                                </span></p>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                    {cert.status}
                                                </span>
                                                <button
                                                    onClick={() => downloadCertificate(cert)}
                                                    className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                                >
                                                    Download Certificate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Profile;




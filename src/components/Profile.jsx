import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, DollarSign, Award, LogOut, Calendar, Droplet, MapPin, RefreshCw } from "lucide-react";

function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [loadingCerts, setLoadingCerts] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!storedUser || !token) {
            navigate("/login");
            return;
        }
        try {
            setUser(JSON.parse(storedUser));
        } catch (err) {
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (activeTab === "certificates" && user) {
            fetchCertificates();
        }
    }, [activeTab, user]);

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    async function fetchCertificates() {
        setLoadingCerts(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificates`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (res.ok) {
                const data = await res.json();
                setCertificates(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCerts(false);
        }
    }

    async function handleBloodSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            bloodGroup: formData.get("bloodGroup"),
            donationDate: formData.get("donationDate"),
            hospital: formData.get("hospital")
        };

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-donation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("✅ Blood donation submitted successfully!");
                e.target.reset();
                setActiveTab("dashboard");
            } else {
                const result = await res.json();
                alert("❌ " + (result.msg || "Failed to submit"));
            }
        } catch (err) {
            alert("⚠️ Connection error!");
        }
    }

    const downloadCertificate = async (cert) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificates/download/${cert._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Certificate-${cert.certificateId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } else {
                alert('Failed to download certificate');
            }
        } catch (err) {
            console.error(err);
            alert('Error downloading certificate');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Welcome back, <span className="text-red-600">{user?.name || "Guest"}</span> 👋
                            </h1>
                            <p className="text-gray-600 mt-1">Manage your donations and certificates</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Dashboard Cards */}
                {activeTab === "dashboard" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                            onClick={() => setActiveTab("bloodDonate")}>
                            <Heart size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Blood Donation</h3>
                            <p className="text-red-100 mb-4">Register your blood donation and save lives</p>
                            <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all">
                                Donate Now →
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                            onClick={() => setActiveTab("moneyDonate")}>
                            <DollarSign size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Money Donation</h3>
                            <p className="text-orange-100 mb-4">Support with financial contribution</p>
                            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all">
                                Donate Money →
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                            onClick={() => setActiveTab("certificates")}>
                            <Award size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Certificates</h3>
                            <p className="text-green-100 mb-4">View and download your certificates</p>
                            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all">
                                View All →
                            </button>
                        </div>
                    </div>
                )}

                {/* Blood Donation Form */}
                {activeTab === "bloodDonate" && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                        <button onClick={() => setActiveTab("dashboard")} className="text-red-600 mb-4 hover:underline">← Back</button>
                        <div className="flex items-center gap-3 mb-6">
                            <Heart size={32} className="text-red-600" />
                            <h2 className="text-3xl font-bold text-gray-800">Blood Donation Form</h2>
                        </div>
                        <form onSubmit={handleBloodSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Droplet size={20} className="text-red-600" />
                                    Blood Group
                                </label>
                                <select name="bloodGroup" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all">
                                    <option value="">Select Blood Group</option>
                                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Calendar size={20} className="text-red-600" />
                                    Donation Date
                                </label>
                                <input type="date" name="donationDate" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <MapPin size={20} className="text-red-600" />
                                    Hospital / Blood Bank
                                </label>
                                <input type="text" name="hospital" required placeholder="Enter hospital name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all" />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl">
                                Submit Donation
                            </button>
                        </form>
                    </div>
                )}

                {/* Money Donation */}
                {activeTab === "moneyDonate" && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                        <button onClick={() => setActiveTab("dashboard")} className="text-orange-600 mb-4 hover:underline">← Back</button>
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign size={32} className="text-orange-600" />
                            <h2 className="text-3xl font-bold text-gray-800">Money Donation</h2>
                        </div>
                        <p className="text-gray-600 text-center py-12">Payment integration coming soon...</p>
                    </div>
                )}

                {/* Certificates */}
                {activeTab === "certificates" && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setActiveTab("dashboard")} className="text-green-600 hover:underline">← Back</button>
                            </div>
                            <button 
                                onClick={fetchCertificates}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <Award size={32} className="text-green-600" />
                            <h2 className="text-3xl font-bold text-gray-800">Your Certificates</h2>
                        </div>
                        {loadingCerts ? (
                            <p className="text-center py-12 text-gray-500">Loading...</p>
                        ) : certificates.length === 0 ? (
                            <div className="text-center py-12">
                                <Award size={64} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">No certificates yet. Your approved donations will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {certificates.map(cert => (
                                    <div key={cert._id} className="border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-r from-green-50 to-white">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Award className="text-green-600" size={24} />
                                                    <h3 className="text-xl font-bold text-gray-800">Blood Donation Certificate</h3>
                                                </div>
                                                <div className="space-y-2 text-gray-700">
                                                    <p><span className="font-semibold">ID:</span> {cert.certificateId}</p>
                                                    <p><span className="font-semibold">Blood Group:</span> <span className="bg-red-100 text-red-800 px-2 py-1 rounded">{cert.bloodGroup}</span></p>
                                                    <p><span className="font-semibold">Donation Date:</span> {new Date(cert.donationDate).toLocaleDateString()}</p>
                                                    <p><span className="font-semibold">Issued:</span> {new Date(cert.issuedDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => downloadCertificate(cert)} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-md hover:shadow-lg">
                                                Download Certificate
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;

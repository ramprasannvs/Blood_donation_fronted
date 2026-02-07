import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BloodDonationForm from "./BloodDonationForm";

function Profile() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("blood");
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [loadingCerts, setLoadingCerts] = useState(false);

    /* ================= LOAD USER ================= */
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

    /* ================= FETCH CERTIFICATES ================= */
    const fetchCertificates = useCallback(async () => {
        setLoadingCerts(true);
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/certificates`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();
            console.log("Certificates API response:", data); // 🔍 DEBUG

            if (res.ok && Array.isArray(data)) {
                setCertificates(data);
            } else {
                setCertificates([]);
            }
        } catch (err) {
            console.error("Certificate fetch error:", err);
            setCertificates([]);
        } finally {
            setLoadingCerts(false);
        }
    }, []);

    /* Fetch certificates when tab opens */
    useEffect(() => {
        if (activeTab === "certificates") {
            fetchCertificates();
        }
    }, [activeTab, fetchCertificates]);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    /* ================= DOWNLOAD CERTIFICATE PDF ================= */
    const downloadCertificate = (cert) => {
        const url = `${process.env.REACT_APP_API_URL}/api/certificates/download/${cert._id}`;
        window.open(url, "_blank");
    };

    return (
        <div className="flex min-h-screen">
            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-gray-100 p-6 space-y-4">
                <h2 className="font-bold text-lg">Menu</h2>

                <button
                    className="block text-left w-full"
                    onClick={() => setActiveTab("blood")}
                >
                    Blood Donation
                </button>

                <button
                    className="block text-left w-full"
                    onClick={() => setActiveTab("money")}
                >
                    Money Donation
                </button>

                <button
                    className="block text-left w-full"
                    onClick={() => setActiveTab("certificates")}
                >
                    Certificates
                </button>

                <button
                    onClick={handleLogout}
                    className="text-red-600 block text-left"
                >
                    Logout
                </button>
            </aside>

            {/* ================= MAIN ================= */}
            <main className="flex-1 p-8 bg-white">
                <h1 className="text-2xl font-bold mb-6">
                    Welcome, {user?.name} 👋
                </h1>

                {/* BLOOD DONATION */}
                {activeTab === "blood" && <BloodDonationForm />}

                {/* MONEY DONATION */}
                {activeTab === "money" && (
                    <div>
                        <h2 className="text-xl font-semibold">Money Donation</h2>
                        <p>Payment integration yahan aayega</p>
                    </div>
                )}

                {/* CERTIFICATES */}
                {activeTab === "certificates" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Certificates</h2>

                        {loadingCerts ? (
                            <p>Loading certificates...</p>
                        ) : certificates.length === 0 ? (
                            <p>No certificates found</p>
                        ) : (
                            certificates.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="border p-4 mb-3 rounded"
                                >
                                    <p>
                                        <strong>Certificate ID:</strong>{" "}
                                        {cert.certificateId}
                                    </p>

                                    <p>
                                        <strong>Blood Group:</strong>{" "}
                                        {cert.bloodGroup}
                                    </p>

                                    <p>
                                        <strong>Donation Date:</strong>{" "}
                                        {new Date(cert.donationDate).toLocaleDateString()}
                                    </p>

                                    <button
                                        onClick={() => downloadCertificate(cert)}
                                        className="text-blue-600 underline mt-2"
                                    >
                                        Download Certificate (PDF)
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Profile;

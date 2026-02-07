import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BloodDonationForm from "./BloodDonationForm";


function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]);

    /* ================= LOAD USER ================= */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
        } catch {
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    /* ================= FETCH CERTIFICATES ================= */
    const fetchCertificates = useCallback(async () => {
        if (!user) return;

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/blood-donation/certificates/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();
            if (res.ok) setCertificates(data);
            else setCertificates([]);
        } catch (err) {
            console.error("Certificate fetch error:", err);
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === "certificates") {
            fetchCertificates();
        }
    }, [activeTab, fetchCertificates]);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    /* ================= DOWNLOAD CERTIFICATE ================= */
    const downloadCertificate = (certificate) => {
        const content = `
BLOOD DONATION CERTIFICATE

Certificate ID: ${certificate.certificateId}
Donor Name: ${certificate.donorName}
Blood Group: ${certificate.bloodGroup}
Donation Date: ${new Date(certificate.donationDate).toLocaleDateString()}
Issued Date: ${new Date(certificate.issuedDate).toLocaleDateString()}

Thank you for saving lives!
    `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Certificate-${certificate.certificateId}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen">
            {/* SIDEBAR */}
            <aside className="w-64 bg-gray-100 p-6 space-y-4">
                <h2 className="font-bold text-lg">Menu</h2>

                <button onClick={() => setActiveTab("blood")}>
                    Blood Donation
                </button>

                <button onClick={() => setActiveTab("money")}>
                    Money Donation
                </button>

                <button onClick={() => setActiveTab("certificates")}>
                    Certificates
                </button>

                <button onClick={handleLogout} className="text-red-600">
                    Logout
                </button>
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-8 bg-white">
                <h1 className="text-2xl font-bold mb-6">
                    Welcome, {user?.name} 👋
                </h1>

                {/* BLOOD DONATION */}
                {activeTab === "blood" && (
                    <BloodDonationForm />
                )}

                {/* MONEY DONATION */}
                {activeTab === "money" && (
                    <div>
                        <h2 className="text-xl font-semibold">Money Donation</h2>
                        <p>👉 Yahan payment / donation form aayega</p>
                    </div>
                )}

                {/* CERTIFICATES */}
                {activeTab === "certificates" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Certificates</h2>

                        {certificates.length === 0 ? (
                            <p>No certificates found</p>
                        ) : (
                            certificates.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="border p-4 mb-3 rounded"
                                >
                                    <p>Certificate ID: {cert.certificateId}</p>
                                    <button
                                        onClick={() => downloadCertificate(cert)}
                                        className="text-blue-600 underline"
                                    >
                                        Download Certificate
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

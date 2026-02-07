import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]);

    // 🔧 Fetch certificates (defined BEFORE useEffect)
    const fetchCertificates = useCallback(async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/blood-donation/certificates/${user?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.ok) {
                const data = await res.json();
                setCertificates(data);
            } else {
                console.log("No certificates found");
            }
        } catch (err) {
            console.error("Error fetching certificates:", err);
        }
    }, [user]);

    // ✅ Load user from localStorage
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

    // ✅ Fetch certificates when tab is active
    useEffect(() => {
        if (activeTab === "certificates" && user) {
            fetchCertificates();
        }
    }, [activeTab, user, fetchCertificates]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    // Download Certificate
    const downloadCertificate = (certificate) => {
        const certificateContent = `
BLOOD DONATION CERTIFICATE

Certificate ID: ${certificate.certificateId}
Donor Name: ${certificate.donorName}
Blood Group: ${certificate.bloodGroup}
Donation Date: ${new Date(certificate.donationDate).toLocaleDateString()}
Issued Date: ${new Date(certificate.issuedDate).toLocaleDateString()}

Thank you for saving lives!
        `;

        const blob = new Blob([certificateContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
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
                <button onClick={() => setActiveTab("bloodDonate")}>
                    Blood Donation
                </button>
                <button onClick={() => setActiveTab("moneyDonate")}>
                    Money Donation
                </button>
                <button onClick={() => setActiveTab("certificates")}>
                    Certificates
                </button>
                <button onClick={handleLogout} className="text-red-600">
                    Logout
                </button>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-8 bg-white">
                <h1 className="text-2xl font-bold mb-6">
                    Welcome, {user?.name || "Guest"} 👋
                </h1>

                {activeTab === "certificates" && (
                    <div>
                        {certificates.length === 0 ? (
                            <p>No certificates found</p>
                        ) : (
                            certificates.map((cert) => (
                                <div key={cert._id}>
                                    <p>{cert.certificateId}</p>
                                    <button
                                        onClick={() => downloadCertificate(cert)}
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

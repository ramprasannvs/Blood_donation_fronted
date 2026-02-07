import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-500">CareDrop</h1>

            {/* agar user login nahi hai to links dikhेंगे */}
            {!user ? (
                <div className="space-x-6">
                    <Link to="/" className="hover:text-red-500">Home</Link>
                    <Link to="/about" className="hover:text-red-500">About</Link>
                    <Link to="/signup" className="hover:text-red-500">Sign Up</Link>
                    <Link to="/login" className="hover:text-red-500">Login</Link>
                </div>
            ) : (
                // agar login ho gaya hai to sirf user icon दिखेगा
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center space-x-2"
                    >
                        <FaUserCircle size={28} className="text-red-500" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setOpen(false)}
                            >
                                👤 Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;

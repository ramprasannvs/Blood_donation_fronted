


import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-red-500 text-white p-6">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div className="text-xl font-bold flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Caredrop</Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-8 items-center">
              {!user ? (
                // ✅ Guest Navbar
                <>
                  <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                  <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
                  <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                  <li><Link to="/register" className="hover:text-gray-300">Sign Up</Link></li>
                  <li><Link to="/login" className="hover:text-gray-300">Sign In</Link></li>
                </>
              ) : user.role === "admin" ? (
                // ✅ Admin Navbar (FIXED - No duplicate items)
                <>
                  <li><Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
                  <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
                  <li className="font-medium">
                    <span className="bg-blue-500 px-2 py-1 rounded text-xs mr-2">ADMIN</span>
                    {user.name}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-white text-red-500 px-3 py-1 rounded-lg hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // ✅ Donor Navbar (Regular User)
                <>
                  <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                  <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
                  <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                  <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
                  <li className="font-medium">
                    <span className="bg-green-500 px-2 py-1 rounded text-xs mr-2">DONOR</span>
                    {user.name}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-white text-red-500 px-3 py-1 rounded-lg hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/bgimage.png')`, zIndex: -1 }}
        ></div>
        {children}
      </main>

      {/* Footer Section */}
      <footer className="bg-red-500 text-white py-6 text-center">
        <p>&copy; 2025 Caredrop. All rights reserved.</p>
        <div className="mt-4">
          <a href="#facebook" className="mx-2 hover:text-gray-300">Facebook</a>
          <a href="#twitter" className="mx-2 hover:text-gray-300">Twitter</a>
          <a href="#instagram" className="mx-2 hover:text-gray-300">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
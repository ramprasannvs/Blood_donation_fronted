


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
      <header className="bg-red-500 text-white p-4 md:p-6">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div className="text-lg md:text-xl font-bold flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Caredrop</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            {!user ? (
              <>
                <li><Link to="/" className="block py-2 hover:bg-red-600 px-2 rounded">Home</Link></li>
                <li><Link to="/about" className="block py-2 hover:bg-red-600 px-2 rounded">About</Link></li>
                <li><Link to="/services" className="block py-2 hover:bg-red-600 px-2 rounded">Services</Link></li>
                <li><Link to="/contact" className="block py-2 hover:bg-red-600 px-2 rounded">Contact</Link></li>
                <li><Link to="/register" className="block py-2 hover:bg-red-600 px-2 rounded">Sign Up</Link></li>
                <li><Link to="/login" className="block py-2 hover:bg-red-600 px-2 rounded">Sign In</Link></li>
              </>
            ) : user.role === "admin" ? (
              <>
                <li><Link to="/admin/dashboard" className="block py-2 hover:bg-red-600 px-2 rounded">Dashboard</Link></li>
                <li><Link to="/about" className="block py-2 hover:bg-red-600 px-2 rounded">About</Link></li>
                <li className="py-2 px-2">
                  <span className="bg-blue-500 px-2 py-1 rounded text-xs mr-2">ADMIN</span>
                  {user.name}
                </li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left py-2 hover:bg-red-600 px-2 rounded">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="block py-2 hover:bg-red-600 px-2 rounded">Home</Link></li>
                <li><Link to="/about" className="block py-2 hover:bg-red-600 px-2 rounded">About</Link></li>
                <li><Link to="/services" className="block py-2 hover:bg-red-600 px-2 rounded">Services</Link></li>
                <li><Link to="/contact" className="block py-2 hover:bg-red-600 px-2 rounded">Contact</Link></li>
                <li><Link to="/profile" className="block py-2 hover:bg-red-600 px-2 rounded">Profile</Link></li>
                <li className="py-2 px-2">
                  <span className="bg-green-500 px-2 py-1 rounded text-xs mr-2">DONOR</span>
                  {user.name}
                </li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left py-2 hover:bg-red-600 px-2 rounded">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
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
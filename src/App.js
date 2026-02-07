import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import "./index.css";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // 👇 page refresh pe data restore
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/register" element={<Register />} />

          {/* 👇 props pass karo */}
          <Route
            path="/login"
            element={<Login setToken={setToken} setUser={setUser} />}
          />

          <Route path="/contact" element={<Contact />} />

          {/* 🔒 Donor */}
          <Route
            path="/profile"
            element={token ? <Profile user={user} /> : <Navigate to="/login" />}
          />

          {/* 🔒 Admin */}
          <Route
            path="/admin/dashboard"
            element={
              token && user?.role === "admin"
                ? <AdminDashboard />
                : <Navigate to="/login" />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

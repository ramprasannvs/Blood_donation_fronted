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
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";


import "./index.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

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

          <Route
            path="/login"
            element={<Login setToken={setToken} setUser={setUser} />}
          />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/profile"
            element={token ? <Profile user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/admin/dashboard"
            element={
              token && user?.role === "admin"
                ? <AdminDashboard />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

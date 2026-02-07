import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken, setUser }) {   // 👈 props add kiya
  const [form, setForm] = useState({ email: "", password: "", role: "donor" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.msg || "Invalid credentials");
      return;
    }

    // save token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // update app state
    setToken(data.token);
    setUser(data.user);

    // redirect
    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-500">Login</h1>
        <p className="text-gray-500 text-center mt-2">Enter your details</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="donor"
                checked={form.role === "donor"}
                onChange={handleChange}
              />
              <span>Donor</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              <span>Admin</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-300 transition"
          >
            Login
          </button>
        </form>

        {/* Login.js mein Forgot Password link add karo */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 font-medium hover:underline">
            Register
          </Link>

          {/* <span className="mx-2">•</span> */}
          <br />

          <Link to="/forgot-password" className="text-red-500 font-medium hover:underline">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

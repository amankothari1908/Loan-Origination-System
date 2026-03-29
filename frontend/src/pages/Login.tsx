import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/applicationApi";
import type { LoginRequest } from "../types";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // Validation function
  const validate = (): string | null => {
    if (!form.email.trim()) return "Email is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Enter a valid email";

    if (!form.password.trim()) return "Password is required";

    if (form.password.length < 4)
      return "Password must be at least 4 characters";

    return null;
  };

  const handleLogin = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await loginApi(form);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Login failed");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Loan Origination System
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            value={form.email}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              setError("");
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            value={form.password}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              setError("");
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

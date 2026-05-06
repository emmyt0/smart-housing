"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../Provider"; // ✅ IMPORT THIS

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth(); // ✅ GET LOGIN FUNCTION

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ LOGIN FLOW (FIXED)
      if (isLogin) {
        console.log("LOGIN RESPONSE:", data);

        // 🔥 THIS updates global session + navbar
        login(data.user, data.token);

        setLoading(false);
        onClose();
        return;
      }

      // ✅ REGISTER FLOW
      setSuccess("✅ Account created successfully. Please login.");

      setName("");
      setEmail("");
      setPassword("");
      setIsLogin(true);

      setLoading(false);

    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {isLogin
            ? "Login to continue"
            : "Sign up to find your perfect apartment"}
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">
            {success}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2.5 text-sm"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2.5 text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2.5 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-500 py-2.5 text-white font-semibold"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-sm text-center text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
            className="ml-1 font-semibold text-red-500"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
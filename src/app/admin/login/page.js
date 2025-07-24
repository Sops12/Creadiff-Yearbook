"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background (bottom layer) */}
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(90deg, #1C1C65 0%, #2F2F8A 67%, #3E27A5 100%)"
      }} />
      {/* Blurred Logo Image (middle layer) */}
      <img
        src="/Creadiff-Admin.png"
        alt="Creadiff Admin"
        className="absolute inset-0 w-full h-full object-cover object-center  z-10"
        style={{ pointerEvents: "none" }}
      />
      {/* Glass Form (top layer) */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-sm border border-white/20"
      >
        {/* Logo Image */}
        <img src="/Creadiff-Text.png" alt="CREADIFF" className="mx-auto mb-4 w-48 h-auto" />
        <input
          type="text"
          placeholder="Email Address"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="p-3 rounded text-white outline-none focus:ring-2 backdrop-blur-md border border-white/20 bg-transparent placeholder-white/60 focus:ring-[#9C90D0]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 rounded text-white outline-none focus:ring-2 backdrop-blur-md border border-white/20 bg-transparent placeholder-white/60 focus:ring-[#9C90D0]"
          required
        />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-transparent hover:bg-[#7a6bb7]/40 text-white font-bold py-3 rounded transition-colors backdrop-blur-md border border-white/20">LOGIN</button>
      </form>
    </div>
  );
} 
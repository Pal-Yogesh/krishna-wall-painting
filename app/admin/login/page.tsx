"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLoginPage() {
  const { login, user, authLoading } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace("/admin/dashboard");
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl text-white"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              🎨
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Admin Panel</h1>
            <p className="text-sm text-stone-400 mt-1">Sign in to manage your store</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type ViewState = "LOGIN" | "SIGNUP" | "VERIFY_OTP" | "FORGOT_PASSWORD" | "RESET_PASSWORD";

export const AuthModal: React.FC = () => {
  const { showAuthModal, setShowAuthModal, login } = useAuth();
  const [view, setView] = useState<ViewState>("LOGIN");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!showAuthModal) return null;

  const API_BASE = "http://200.141.1.164:5000/api/auth"; // Hardcoded for demo, normally from process.env

  const close = () => {
    setShowAuthModal(false);
    resetState();
  };

  const resetState = () => {
    setView("LOGIN");
    setEmail("");
    setPassword("");
    setPhone("");
    setOtp("");
    setNewPassword("");
    setError("");
    setSuccess("");
  };

  const handleError = (err: any) => {
    setError(err.message || "Something went wrong.");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSuccess("Account created! Check your email for the OTP.");
      setView("VERIFY_OTP");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (data.needsVerification) {
          setError(data.message);
          setView("VERIFY_OTP");
          return;
        }
        throw new Error(data.message);
      }
      
      login(data.user, data.token);
      close();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      login(data.user, data.token);
      close();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSuccess("OTP sent to your email.");
      setView("RESET_PASSWORD");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      login(data.user, data.token);
      close();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-backdrop" onClick={close}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={close}>✕</button>
        
        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        {view === "LOGIN" && (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn btn-pink full-w" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="auth-links">
              <span onClick={() => setView("FORGOT_PASSWORD")}>Forgot Password?</span>
              <span onClick={() => setView("SIGNUP")}>Don't have an account? Sign up</span>
            </div>
          </div>
        )}

        {view === "SIGNUP" && (
          <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
              <div className="field">
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Phone</label>
                <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn btn-lime full-w" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
            <div className="auth-links">
              <span onClick={() => setView("LOGIN")}>Already have an account? Login</span>
            </div>
          </div>
        )}

        {view === "VERIFY_OTP" && (
          <div>
            <h2>Verify Email</h2>
            <p>Enter the 6-digit OTP sent to {email}</p>
            <form onSubmit={handleVerifyOtp}>
              <div className="field">
                <label>OTP</label>
                <input type="text" required maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
              <button className="btn btn-pink full-w" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
            </form>
          </div>
        )}

        {view === "FORGOT_PASSWORD" && (
          <div>
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a password reset OTP.</p>
            <form onSubmit={handleForgotPassword}>
              <div className="field">
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button className="btn btn-pink full-w" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset OTP"}
              </button>
            </form>
            <div className="auth-links">
              <span onClick={() => setView("LOGIN")}>Back to Login</span>
            </div>
          </div>
        )}

        {view === "RESET_PASSWORD" && (
          <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="field">
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>OTP</label>
                <input type="text" required maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <button className="btn btn-pink full-w" type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset & Login"}
              </button>
            </form>
          </div>
        )}

      </div>

      <style jsx>{`
        .auth-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .auth-modal {
          background: #fff;
          width: 100%;
          max-width: 400px;
          border-radius: 8px;
          padding: 30px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .auth-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #f1f1f1;
          border: none;
          width: 30px; height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
        .auth-close-btn:hover {
          background: #e91e63;
          color: white;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.5rem;
          color: #333;
        }
        .field {
          margin-bottom: 15px;
        }
        .field label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.9rem;
          color: #555;
        }
        .field input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .full-w {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          margin-top: 10px;
        }
        .auth-links {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.9rem;
          text-align: center;
        }
        .auth-links span {
          color: #e91e63;
          cursor: pointer;
        }
        .auth-links span:hover {
          text-decoration: underline;
        }
        .auth-alert {
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }
        .auth-alert.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #ef9a9a;
        }
        .auth-alert.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        }
      `}</style>
    </div>
  );
};

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { validateAuth } from "../utils/validators";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const { login, signup, googleSignin, loading } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  async function submit(e) {
    e.preventDefault();
    const nextErrors = validateAuth(form, mode);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;

    try {
      if (mode === "signup") await signup(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.message);
    }
  }

  async function handleGoogleSuccess(response) {
    setServerError("");
    try {
      if (!response.credential) {
        throw new Error("Google did not return a login credential.");
      }
      await googleSignin(response.credential);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(error.message || "Google sign-in could not complete.");
    }
  }

  return (
    <section className="authPage">
      <div className="authCard">
        <div className="authIntro">
          <ChefHat size={32} />
          <h1>{mode === "login" ? "Welcome back" : "Create your Smart Chef account"}</h1>
          <p>Use a strong password. Regex validation is applied before the request is sent.</p>
        </div>
        <div className="tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Signup</button>
        </div>
        <form className="form" onSubmit={submit}>
          {mode === "signup" && (
            <label>
              Full name
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Rida Maham" />
              {errors.name && <small>{errors.name}</small>}
            </label>
          )}
          <label>
            Email address
            <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Strong@123" />
            {errors.password && <small>{errors.password}</small>}
          </label>
          {serverError && <p className="errorBox">{serverError}</p>}
          <button className="primaryButton wide" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}</button>
        </form>
        <div className="googleBox">
          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setServerError("Google sign-in failed.")}
            />
          ) : (
            <p className="muted">Google sign-in will appear after adding VITE_GOOGLE_CLIENT_ID in frontend/.env.</p>
          )}
        </div>
      </div>
    </section>
  );
}

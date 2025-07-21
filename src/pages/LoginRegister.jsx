import React, { useState } from "react";
import "./LoginRegister.css";

const API_BASE = "https://colonize-mars-web-server.onrender.com";

function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/register" : "/login";

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Success! Redirecting to game...");
        setTimeout(() => {
          window.location.href = "/game"; // TODO: Replace with actual game route if different
        }, 1500);
      } else {
        setMessage(data.error || "❌ Something went wrong");
      }
    } catch (err) {
      setMessage("❌ Error connecting to server");
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("images/mars_background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textShadow: "0 0 5px #000",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1>{isRegister ? "Create Account" : "Log In"}</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#ff4500",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            padding: "10px",
            backgroundColor: "#666",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isRegister ? "Have an account? Log In" : "No account? Register"}
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default LoginRegister;

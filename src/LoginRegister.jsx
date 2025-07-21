import React, { useState } from "react";

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
        // Simulate redirect
        setTimeout(() => {
          window.location.href = "/game"; // Change this later to your actual game
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
      }}
    >
      <h1>{isRegister ? "Create Account" : "Log In"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", marginBottom: "10px" }}>
          {isRegister ? "Register" : "Login"}
        </button>
        <button type="button" onClick={() => setIsRegister(!isRegister)} style={{ padding: "10px" }}>
          {isRegister ? "Have an account? Log In" : "No account? Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginRegister;

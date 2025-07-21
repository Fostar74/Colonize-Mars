import React, { useState } from "react";

function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (type) => {
    setMessage("");
    const endpoint =
      type === "register"
        ? "https://colonize-mars-web-server.onrender.com/register"
        : "https://colonize-mars-web-server.onrender.com/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${type} successful!`);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Colonize Mars</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => handleAuth("register")}>Register</button>
        <button onClick={() => handleAuth("login")}>Login</button>
      </div>
      {message && <div>{message}</div>}
    </div>
  );
}

export default LoginRegister;

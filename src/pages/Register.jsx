import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

    const res = await fetch(`http://localhost:5000/users?email=${email}`);
    const data = await res.json();

    if (data.length > 0) {
      alert("User already exists with this email");
      return;
    }

    const newUser = { name, email, password };

    await fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    });

    alert("User registered successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="login-form">
        <div className="form-card">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

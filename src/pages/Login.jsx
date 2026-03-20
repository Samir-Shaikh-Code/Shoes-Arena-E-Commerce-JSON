import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {

  const {login} = useContext(AuthContext)
  const navigate = useNavigate();

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleLogin = async (e) => {
    
    e.preventDefault();

    if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

    const res =  await fetch (`http://localhost:5000/users?email=${email}&password=${password}`)

    const data = await res.json();

    if(data.length > 0){
      login(data[0]);
      alert("Logged in successfully");
      navigate("/")
    }else{
      alert("Invalid credentials..!")
    }
  }

  return (
    <>
        <div className="login-form">
          
          <div className="form-card">
          <h1>Login</h1>
          <form  onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/><br />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/><br />
          <button type="submit">Login</button>
         </form>
          </div>

        </div>
        
    </>
  )
}

export default Login;
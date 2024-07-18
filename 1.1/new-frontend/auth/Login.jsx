import React, { useState } from "react";
import { login } from "./authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/protected");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-login">
      {/* <div className="border-box-login"></div> */}
      <div className="box-login">
        <h2 className="h2-login">Login</h2>
        <form className="form-login" onSubmit={handleSubmit}>
          <div>
            <label className="label-login">Username:</label>
            <input
              className="input-login"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="label-login">Password:</label>
            <input
              className="input-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
          <br />
          {error && <p style={{ color: "red", fontWeight: 600 }}>{`Error to login`}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

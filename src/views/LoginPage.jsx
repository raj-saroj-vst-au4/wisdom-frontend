import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ API_URL }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(true);
  const navigate = useNavigate();

  async function handleLogin(username, password) {
    try {
      const loginres = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (loginres.ok) {
        const response = await loginres.json();
        localStorage.setItem("token", response.token);
        return navigate("/");
      }
      setIncorrect(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <div className="login-form">
        <form>
          <div className="avatar">
            <i className="bi bi-person-video3"></i>
          </div>
          <h4 className="modal-title">Login to Wisdom Classes</h4>
          <div className="form-group">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="bi bi-person-video3"></i>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required="required"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="bi bi-incognito"></i>
                </div>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group small clearfix">
            <div
              className={incorrect ? "d-none" : "" + "text-danger text-center"}
            >
              Invalid Username or Password
            </div>
          </div>
        </form>
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={() => handleLogin(username, password)}
        >
          Login
        </button>

        <div className="text-center small">
          Facing Problems ?{" "}
          <a href="tel:9967586822">
            <i className="bi bi-telephone-forward"> Call Raj</i>
          </a>
        </div>
      </div>
    </div>
  );
};

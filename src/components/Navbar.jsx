import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [expandedNav, setExpandedNav] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  const toggleNav = () => {
    setExpandedNav(!expandedNav);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Wisdom Classes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => toggleNav()}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse collapse ${expandedNav ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Management
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => toggleNav()}
                    to="/students"
                  >
                    Student Management
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => toggleNav()}
                    to="/fees"
                  >
                    Fees Management
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <a className="nav-link disabled" aria-disabled="true">
              Teacher - Ishwari
            </a>
          </form>
          <br></br>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className=" btn btn-danger"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, {useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

  let location = useLocation();
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  }

  const [menu, setMenu] = useState("hidden");
  const onClick = () => {
    if (menu === "hidden") {
      document.getElementById("navbarNav").classList.remove("d-none");
      setMenu("visible");
    }
    else {
      document.getElementById("navbarNav").classList.add("d-none");
      setMenu("hidden");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: "#FCF7F8" }} to="/">NoteBook</Link>
        <button onClick={onClick} className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link visible ${location.pathname === "/" ? "active" : ""}`} aria-current="page" style={{ color: "#FCF7F8" }} to="/">Home</Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? <div className="d-flex">
            <Link className="btn btn-dark mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-dark" to="/signup" role="button">Signup</Link>
          </div> : <Link onClick={handleLogout} className="btn btn-dark" to="/login" role="button">Logout</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
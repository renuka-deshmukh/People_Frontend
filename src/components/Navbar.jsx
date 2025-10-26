import React, { useContext } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between align-items-center">
      {/* Left side - Name / Logo */}
      <div
        className="navbar-brand fw-bold text-primary mb-0 cursor-pointer"
        style={{ cursor: "pointer", fontSize: "30px" }}
        onClick={() => navigate("/")}
      >
        People.co
      </div>

      {/* Right side - Bell + Username */}
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-light position-relative border-0"
          title="Notifications"
        >
          <Bell size={22} className="text-secondary" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            
          </span>
        </button>

        <span className="fw-medium text-dark">
          {loggedUser?.name || "Guest"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "People Directory", path: "/people", icon: <Users size={18} /> },
  ];

  return (
    <div
      style={{
        width: "210px",
        backgroundColor: "#fff",
        borderRight: "1px solid #eee",
        padding: "16px",
        overflow: "hidden",
      }}
      className="shadow-sm d-flex flex-column"
    >
      {menuItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="btn d-flex align-items-center border-0 text-start mb-2"
            style={{
              backgroundColor: active ? "#f3e8ff" : "transparent",
              color: active ? "#7B3AED" : "#212529",
              fontWeight: active ? "600" : "400",
              borderRadius: "8px",
              padding: "8px 12px",
              transition: "0.2s",
            }}
          >
            <span className="me-2">{item.icon}</span>
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;

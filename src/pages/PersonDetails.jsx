import React from "react";

const PersonDetails = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={`http://localhost:7001/uploads/${person.avatarPath}`}
            alt={person.firstName}
            width="60"
            height="60"
            className="rounded-circle me-3"
          />
          <div>
            <h5 className="mb-0">{person.firstName} {person.lastName}</h5>
            <small>@{person.username || person.firstName?.toLowerCase()}</small><br />
            <small className="text-light">{person.role || "Member"}</small>
          </div>
        </div>
        <button className="btn btn-sm btn-light" onClick={onClose}>✕</button>
      </div>

      <div className="card-body">
        <h6 className="fw-bold mb-3">Personal Information</h6>
        <div className="row mb-2">
          <div className="col-4 fw-semibold text-muted">Date of Birth:</div>
          <div className="col-8">{person.dateOfBirth || "—"}</div>
        </div>
         <div className="row mb-2">
          <div className="col-4 fw-semibold text-muted">Contact:</div>
          <div className="col-8">{person.phone || "—"}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 fw-semibold text-muted">Address:</div>
          <div className="col-8">{person.address || "—"}</div>
        </div>
       
        <div className="row mb-2">
          <div className="col-4 fw-semibold text-muted">Email:</div>
          <div className="col-8">{person.email || "—"}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 fw-semibold text-muted">Work Email Address:</div>
          <div className="col-8">{person.email || "—"}</div>
        </div>

        <h6 className="fw-bold mt-4 mb-3">Research & Publication</h6>
        <p className="text-muted small">
          {person.research ||
            "No research/publication details available."}
        </p>
      </div>
    </div>
  );
};

export default PersonDetails;

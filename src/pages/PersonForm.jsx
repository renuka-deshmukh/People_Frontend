import React, { useState, useEffect } from "react";
import { createPeople, updatePeople } from "../apis/peopleApi";

const PersonForm = ({ show, onClose, onSuccess, personData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    notes: "",
    role: "",
    status: "Active",
    teams: "",
    avatar: null,
  });

  useEffect(() => {
    if (personData) {
      setFormData({
        firstName: personData.firstName || "",
        lastName: personData.lastName || "",
        phone: personData.phone || "",
        email: personData.email || "",
        dateOfBirth: personData.dateOfBirth
          ? new Date(personData.dateOfBirth).toISOString().split("T")[0]
          : "",
        bloodGroup: personData.bloodGroup || "",
        address: personData.address || "",
        notes: personData.notes || "",
        role: personData.role || "",
        status: personData.status || "Active",
        teams: Array.isArray(personData.teams)
          ? personData.teams.join(", ")
          : "",
        avatar: null,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        bloodGroup: "",
        address: "",
        notes: "",
        role: "",
        status: "Active",
        teams: "",
        avatar: null,
      });
    }
  }, [personData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "teams") {
        const teamArray = formData.teams
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        data.append("teams", JSON.stringify(teamArray));
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      let res;
      if (personData?.id) {
        res = await updatePeople(personData.id, data);
      } else {
        res = await createPeople(data);
      }

      if (res.data.success) {
        onSuccess();
        onClose();
      }
      alert(res.data.msg);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {personData ? "Edit Member" : "Add Member"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row g-3">
                  {/* First Name */}
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Blood Group */}
                  <div className="col-md-6">
                    <label className="form-label">Blood Group</label>
                    <select
                      name="bloodGroup"
                      className="form-select"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Notes */}
                  <div className="col-md-12">
                    <label className="form-label">Notes</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      rows="2"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Role */}
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Teams */}
                  <div className="col-md-12">
                    <label className="form-label">Teams</label>
                    <input
                      type="text"
                      name="teams"
                      className="form-control"
                      placeholder="Design, Product, Marketing"
                      value={formData.teams}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Avatar Upload */}
                  <div className="col-md-12">
                    <label className="form-label">Avatar</label>
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: "#0b3d91" }}
              >
                {personData ? "Update Member" : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonForm;

import React, { useState, useEffect, useRef } from "react";
import { updatePeople } from "../apis/peopleApi";
import { X } from "lucide-react";

const EditPerson = ({ show, onClose, onSuccess, personData }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        role: "",
        status: "Active",
        teams: [],
        avatar: null,
        avatarPreview: "",
    });

    const fileInputRef = useRef();

    useEffect(() => {
        if (personData) {
            setFormData({
                firstName: `${personData.firstName || ""} ${personData.lastName || ""}`.trim(),
                email: personData.email || "",
                role: personData.role || "",
                status: personData.status || "Active",
                teams: Array.isArray(personData.teams)
                    ? personData.teams
                    : personData.teams
                        ? JSON.parse(personData.teams)
                        : [],

                avatarPreview: personData.avatarPath
                    ? `http://localhost:7001/uploads/${personData.avatarPath}`
                    : "",
                avatar: null,
            });
        }
    }, [personData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTeamKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setFormData({
                ...formData,
                teams: [...formData.teams, e.target.value.trim()],
            });
            e.target.value = "";
        }
    };

    const removeTeam = (team) => {
        setFormData({
            ...formData,
            teams: formData.teams.filter((t) => t !== team),
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                avatar: file,
                avatarPreview: URL.createObjectURL(file),
            });
        }
    };

    const handleRemovePhoto = () => {
        setFormData({ ...formData, avatar: null, avatarPreview: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("email", formData.email);
        data.append("role", formData.role);
        data.append("status", formData.status);
        data.append("teams", JSON.stringify(formData.teams));
        if (formData.avatar) data.append("avatar", formData.avatar);

        try {
            const res = await updatePeople(personData.id, data);
            if (res.data.success) {
                onSuccess();
                onClose();
            }
            alert(res.data.msg);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    if (!show) return null;

    return (
        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
        >
            <div
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: "500px" }}
            >
                <div className="modal-content border-0 rounded-4 shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-semibold">Edit Profile</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Profile Image */}
                            <div className="text-center mb-4">
                                <img
                                    src={
                                        formData.avatarPreview ||
                                        "https://via.placeholder.com/100?text=Avatar"
                                    }
                                    alt="Avatar"
                                    className="rounded-circle mb-2"
                                    width="100"
                                    height="100"
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <i className="bi bi-arrow-clockwise me-1"></i> Change Photo
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={handleRemovePhoto}
                                    >
                                        <i className="bi bi-trash me-1"></i> Remove Photo
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* Form Fields */}
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
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

                            <div className="mb-3">
                                <label className="form-label">Teams</label>
                                <div className="d-flex flex-wrap gap-2 border rounded p-2">
                                    {formData.teams.map((team, i) => (
                                        <span
                                            key={i}
                                            className="badge bg-light text-dark border d-flex align-items-center gap-1"
                                        >
                                            {team}
                                            <X
                                                size={14}
                                                className="cursor-pointer"
                                                onClick={() => removeTeam(team)}
                                            />
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Type & press Enter"
                                        className="border-0 flex-grow-1"
                                        style={{ outline: "none" }}
                                        onKeyDown={handleTeamKeyDown}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn text-white"
                                style={{ backgroundColor: "#0b3d91" }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPerson;

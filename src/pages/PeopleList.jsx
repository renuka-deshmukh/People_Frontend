import React, { useEffect, useState } from "react";
import { getAllPeople, deletePeople } from "../apis/peopleApi";
import PersonForm from "./PersonForm";
import DeletePerson from "./DeletePerson";
import EditPerson from "./EditPerson";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

const PeopleList = () => {
    const [people, setPeople] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchPeople = async () => {
        try {
            setLoading(true);
            const res = await getAllPeople();
            if (res.data.success) setPeople(res.data.people);
        } catch (error) {
            console.error("Error fetching people:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    useEffect(() => {
        loadPeople();
    }, []);

    const loadPeople = async () => {
        const res = await getAllPeople();
        if (res.data.success) setPeople(res.data.people);
    };


    const handleAdd = () => {
        setSelectedPerson(null);
        setShowForm(true);
    };

    const handleEdit = (person) => {
        setSelectedPerson(person);
        setShowEditModal(true);
    };

    const handleDeleteClick = (person) => {
        setSelectedPerson(person);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (id) => {
        try {
            const res = await deletePeople(id);
            if (res.data.success) {
                alert("Person deleted successfully");
                fetchPeople(); // re-fetch updated list
            } else {
                alert("Error deleting person");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setShowDeleteModal(false);
        }
    };

    const filteredPeople = people.filter((person) =>
        `${person.firstName} ${person.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-semibold mb-0">Team Members</h3>
                    <small className="text-muted">{filteredPeople.length} users</small>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ marginRight: "10px" }}>
                    <div className="input-group" style={{ width: "230px" }}>
                        <span className="input-group-text bg-white border-end-0">
                            <Search size={16} />
                        </span>
                        <input
                            style={{
                                padding: "4px 10px",
                                fontSize: "0.875rem",
                                marginLeft: "-5px",
                            }}
                            type="text"
                            className="form-control border-start-0 "
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button style={{
                        padding: "4px 10px",
                        fontSize: "0.875rem",
                        marginLeft: "-5px",
                    }}
                        className="btn btn-outline-secondary"
                    >
                        <Filter size={16} />
                    </button>

                    <button
                        className="btn btn-sm d-flex align-items-center gap-1 text-white"
                        style={{
                            backgroundColor: "#0b3d91",
                            borderColor: "#0b3d91",
                            padding: "4px 10px",
                            fontSize: "0.875rem",
                            marginLeft: "-5px", // 🟦 this slightly pulls the button closer to the middle
                        }}
                        onClick={handleAdd}
                    >
                        <Plus size={16} /> Add Member
                    </button>
                </div>

            </div>

            {/* Table */}
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Teams</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-3 text-muted">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredPeople.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-3 text-muted">
                                    No members found
                                </td>
                            </tr>
                        ) : (
                            filteredPeople.map((person) => (
                                <tr key={person.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`http://localhost:7001/uploads/${person.avatarPath}`}
                                                alt={person.firstName}
                                                width="40"
                                                height="40"
                                                className="rounded-circle"
                                            />

                                            <div>
                                                <strong>
                                                    {person.firstName} {person.lastName}
                                                </strong>
                                                <div className="text-muted small">
                                                    @{person.username || person.firstName?.toLowerCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge rounded-pill px-3 py-2 ${person.status === "Active"
                                                ? "bg-success-subtle text-success border border-success-subtle"
                                                : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                                                }`}
                                        >
                                            {person.status || "Inactive"}
                                        </span>
                                    </td>

                                    <td>{person.role || "—"}</td>
                                    <td>{person.email || "—"}</td>

                                    <td>
                                        {Array.isArray(person.teams)
                                            ? person.teams.length > 0
                                                ? person.teams.map((team, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="badge bg-primary-subtle text-primary me-1"
                                                    >
                                                        {team}
                                                    </span>
                                                ))
                                                : "—"
                                            : person.teams
                                                ? <span className="badge bg-primary-subtle text-primary">{person.teams}</span>
                                                : "—"}
                                    </td>

                                    <td className="text-end">
                                        <button
                                            onClick={() => handleEdit(person)}
                                            className="btn btn-sm btn-outline-primary me-2"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(person)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <>

                {/* Delete Confirmation Modal */}
                <DeletePerson
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                    person={selectedPerson}
                />
            </>

            {/* Modal for Add/Edit */}
            <PersonForm
                show={showForm}
                onClose={() => setShowForm(false)}
                onSuccess={fetchPeople}
                personData={selectedPerson}
            />

            <EditPerson
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                personData={selectedPerson}
                onSuccess={loadPeople}
            />

        </div>
    );
};

export default PeopleList;

import React, { useEffect, useState } from "react";
import { getAllPeople } from "../apis/peopleApi";
import PersonDetails from "./PersonDetails";
import { Search } from "lucide-react";

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const res = await getAllPeople();
        if (res.data.success) setPeople(res.data.people);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  const filteredPeople = people.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex" style={{ gap: "1rem" }}>
        {/* LEFT PANEL */}
        <div className="card shadow-sm p-3" style={{ width: "30%", minWidth: "280px" }}>
          <h5 className="fw-semibold mb-2">Team members</h5>
          <small className="text-muted">{filteredPeople.length} users</small>

          <div className="input-group my-3">
            <span className="input-group-text bg-white border-end-0">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-3 text-muted">Loading...</div>
          ) : (
            <ul className="list-group list-group-flush" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {filteredPeople.map((person) => (
                <li
                  key={person.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedPerson?.id === person.id ? "bg-light" : ""
                  }`}
                  onClick={() => setSelectedPerson(person)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={`http://localhost:7001/uploads/${person.avatarPath}`}
                      alt={person.firstName}
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                    <div>
                      <div className="fw-semibold">
                        {person.firstName} {person.lastName}
                      </div>
                      <small className="text-muted">
                        @{person.username || person.firstName?.toLowerCase()}
                      </small>
                    </div>
                  </div>
                  <span
                    className={`badge ${
                      person.status === "Active"
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                    }`}
                  >
                    {person.status || "Inactive"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-grow-1">
          {selectedPerson ? (
            <PersonDetails
              person={selectedPerson}
              onClose={() => setSelectedPerson(null)}
            />
          ) : (
            <div className="text-center text-muted py-5">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleList;

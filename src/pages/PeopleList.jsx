import React, { useEffect, useState } from "react";
import { getAllPeople } from "../apis/peopleApi";
import PersonForm from "./PersonForm";

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPeople = async () => {
    try {
      const res = await getAllPeople();
      if (res.data.success) setPeople(res.data.people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>People List</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Member
        </button>
      </div>

      {/* People Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              <td>{p.firstName + " " + p.lastName}</td>
              <td>{p.phone}</td>
              <td>{p.email}</td>
              <td>{p.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Member Modal */}
      <PersonForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchPeople}
      />
    </div>
  );
};

export default PeopleList;

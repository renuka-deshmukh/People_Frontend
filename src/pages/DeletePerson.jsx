import React from "react";

const DeletePerson = ({ show, onClose, onConfirm, person }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style= {{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Confirm Delete</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <p>
              Are you sure you want to delete{" "}
              <strong>{person?.firstName} {person?.lastName}</strong>?
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onConfirm(person.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePerson;

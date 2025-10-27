import axiosInstance from "../apis/axiosInstance";

// ✅ Get all people
export const getAllPeople = () => axiosInstance.get('/people/getPeople');

// ✅ Create new person (with image upload)
export const createPeople = (formData) =>
  axiosInstance.post("/people/createPeople", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Update person (with image upload if included)
export const updatePeople = (id, formData) =>
  axiosInstance.put(`/people/updatePeople/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Delete person
export const deletePeople = (id) =>
  axiosInstance.delete(`/people/deletePeople/${id}`);

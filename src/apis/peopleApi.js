import axiosInstance from "../apis/axiosInstance";

export const getAllPeople = () => axiosInstance.get('/people/getPeople');

export const createPeople = (formData) =>  axiosInstance.post("/people/createPeople", formData, {
    headers: { "Content-Type": "multipart/form-data" },
});

export const deletePeople = (id) => axiosInstance.delete(`/people/deletePeople/${id}`);

export const updatePeople = (id, formData) => axiosInstance.put(`/people/updatePeople/${id}`, formData)
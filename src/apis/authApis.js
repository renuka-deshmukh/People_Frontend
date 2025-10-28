import axiosInstance from "./axiosInstance";

// Register
export const registerUser = (adminData) =>
  axiosInstance.post("/user/register", adminData);

export async function loginUser(credentials) {
  return axiosInstance.post("/user/login", credentials);
}

// ✅ Get User Info by ID
export const getUserInfoById = (userId) =>
  axiosInstance.get(`/user/me/${userId}`);

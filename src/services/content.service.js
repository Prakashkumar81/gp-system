import axios from "axios";

const API = "http://localhost:5000/content";

export const getAllContent = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const uploadContent = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const approveContent = async (id) => {
  const response = await axios.patch(`${API}/${id}`, {
    status: "approved",
  });

  return response.data;
};

export const rejectContent = async (id, reason) => {
  const response = await axios.patch(`${API}/${id}`, {
    status: "rejected",
    rejectionReason: reason,
  });

  return response.data;
};

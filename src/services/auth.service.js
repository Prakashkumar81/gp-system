import axios from "axios";

const API = "http://localhost:5000";

export const loginUser = async (email, password) => {
  const response = await axios.get(`${API}/users`);

  const user = response.data.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};
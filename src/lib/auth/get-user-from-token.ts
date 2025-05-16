import { fetchWithAuth } from "./fetch-with-auth";

export const getUserFromToken = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`);
    if (!res.ok) return null;
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching user", err);
    return null;
  }
};

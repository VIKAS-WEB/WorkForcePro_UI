export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // prevent double Bearer bug
  if (token.startsWith("Bearer ")) return token;

  return `Bearer ${token}`;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
import { createSlice } from "@reduxjs/toolkit";

// Function to safely get initial state from localStorage
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user")) || null;

    return {
      isAuthenticated: !!token,
      isAdmin: role === "admin",
      token: token || null,
      user: user,
    };
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return {
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      user: null,
    };
  }
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = user.role === "admin";
      state.token = token;
      state.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

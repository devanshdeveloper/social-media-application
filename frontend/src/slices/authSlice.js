import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("userInfo");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: user ? JSON.parse(user) : null,
  },
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

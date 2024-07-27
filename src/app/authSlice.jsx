import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    access: JSON.parse(localStorage.getItem("access")) || null,
    refresh: JSON.parse(localStorage.getItem("refresh")) || null,
    isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
    user: JSON.parse(localStorage.getItem("user")) || "",
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signin(state, action) {
        state.access = action.payload.access
        state.refresh = action.payload.refresh
        state.isLogged = true
        state.user = action.payload.user
        localStorage.setItem("access", JSON.stringify(state.access))
        localStorage.setItem("refresh", JSON.stringify(state.refresh))
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged))
        localStorage.setItem("user", JSON.stringify(state.user))
      },
      logout(state) {
        state.access = null
        state.refresh = null
        state.isLogged = false
        state.user = ""
        localStorage.clear()
      },
    },
  });
  
  export const { signin, logout, updateToken } = authSlice.actions;
  export default authSlice.reducer;
  
import { createSlice } from "@reduxjs/toolkit";
import { authAsyncThunk } from "../asyncThunk/user.asyncThunk";

const initialState = {
  status: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAsyncThunk.loginAsyncThunk.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(
      authAsyncThunk.loginAsyncThunk.fulfilled,
      (state, action) => {
        console.log("action", action);
        state.status = "fullfiled";
        state.token = action.payload.data.token;
        state.user = action.payload.data;
      }
    );
    builder.addCase(
      authAsyncThunk.loginAsyncThunk.rejected,
      (state, action) => {
        state.status = "rejected";
      }
    );
  },
});

export const { removeToken } = authSlice.actions;
export const authState = (state) => authSlice;
export default authSlice.reducer;

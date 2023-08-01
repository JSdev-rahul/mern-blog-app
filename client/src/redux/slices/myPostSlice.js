import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myPost: false,
};

const myPostSlice = createSlice({
  name: "myPostSlice",
  initialState,
  reducers: {
    myPostReducer: (state, action) => {
      state.myPost = action?.payload;
    },
  },
});

export const { myPostReducer } = myPostSlice.actions;
export const myPostState = (state) => myPostSlice;
export default myPostSlice.reducer;

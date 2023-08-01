import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageData: {
    page: 1,
    limit: 6,
  },
};

const pageDataSlice = createSlice({
  name: "pageDataSlice",
  initialState,
  reducers: {
    pageDataReducer: (state, action) => {
      state.pageData = { ...state.pageData, ...action?.payload };
    },
  },
});

export const { pageDataReducer } = pageDataSlice.actions;
export const pageDataState = (state) => pageDataSlice;
export default pageDataSlice.reducer;

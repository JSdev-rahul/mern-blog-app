import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./slices/index";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["auth"],
  
};
export const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

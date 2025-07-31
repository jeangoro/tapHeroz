// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userInfosSlice from "./userInfosSlice";
import RegisterSlice from "./registerSlice";

export const store = configureStore({
  reducer: {
    userInfos: userInfosSlice,
    register: RegisterSlice,
  },
});

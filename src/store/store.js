// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userInfosSlice from "./userInfosSlice";
import RegisterSlice from "./registerSlice";
import ComptesSlice from "./comptesSlice";
import StatistiquesSlice from "./statistiquesSlice";
import ParrainageSlice from "./parrainagesSlice";
import PlaySlice from "./playSlice";

export const store = configureStore({
  reducer: {
    userInfos: userInfosSlice,
    register: RegisterSlice,
    comptes: ComptesSlice,
    statistiques: StatistiquesSlice,
    parrainages: ParrainageSlice,
    play: PlaySlice,
  },
});

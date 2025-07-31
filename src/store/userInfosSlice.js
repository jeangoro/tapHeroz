import { createAction, createSlice } from "@reduxjs/toolkit";

export const setUserInfos = createAction("userInfos/setUserInfos");
export const incrementPoints = createAction("userInfos/incrementPoints");
export const decrementPoints = createAction("userInfos/decrementPoints");
export const reset = createAction("userInfos/reset");
export const setLastPointsSaved = createAction("userInfos/setLastPointsSaved");

const initialState = {
  user_infos: {},
  lastPointsSaved: 0,
};

export const userInfosSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers: {
    setUserInfos: (state, action) => {
      state.user_infos = action.payload; // Immer allows direct mutation in reducers
    },
    incrementPoints: (state) => {
      state.user_infos["SOLDE_POINTS"] = parseInt(state.user_infos["SOLDE_POINTS"]) + 1;
    },
    decrementPoints: (state) => {
      state.user_infos["SOLDE_POINTS"] = parseInt(state.user_infos["SOLDE_POINTS"]) - 2;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    reset: (state) => {
      state.user_infos = {};
    },
    setLastPointsSaved: (state, action) => {
      console.log(action);

      state.lastPointsSaved = parseInt(action.payload);
      console.log(state.lastPointsSaved);
    },
  },
});

// export const { setUserInfos, reset } = userInfosSlice.actions;
export default userInfosSlice.reducer;

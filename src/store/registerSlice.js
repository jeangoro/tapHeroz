import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListLeagues = createAction("register/setListLeagues");
export const reset = createAction("register/reset");

const initialState = {
  listLeagues: null,
};

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setListLeagues: (state, action) => {
      state.listLeagues = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listLeagues = null;
    },
  },
});

// export const { setListLeagues, reset } = ListLeaguesSlice.actions;
export default RegisterSlice.reducer;

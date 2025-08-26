import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListCompetitions = createAction("play/setListCompetitions");
export const setMyCompetition = createAction("play/setMyCompetition");
export const reset = createAction("play/reset");

const initialState = {
  listCompetitions: null,
  myCompetition: null,
};

export const PlaySlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setListCompetitions: (state, action) => {
      state.listCompetitions = action.payload; // Immer allows direct mutation in reducers
    },

    setMyCompetition: (state, action) => {
      state.myCompetition = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listCompetitions = null;
      state.myCompetition = null;
    },
  },
});

// export const { setListTransactions, reset } = ListTransactionsSlice.actions;
export default PlaySlice.reducer;

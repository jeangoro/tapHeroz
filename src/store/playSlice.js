import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListCompetitions = createAction("play/setListCompetitions");
export const reset = createAction("play/reset");

const initialState = {
  listCompetitions: null,
};

export const PlaySlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setListCompetitions: (state, action) => {
      state.listCompetitions = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listCompetitions = null;
    },
  },
});

// export const { setListTransactions, reset } = ListTransactionsSlice.actions;
export default PlaySlice.reducer;

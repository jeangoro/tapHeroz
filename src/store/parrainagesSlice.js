import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListFieuls = createAction("parrainages/setListFieuls");
export const reset = createAction("parrainages/reset");

const initialState = {
  listFieuls: null,
};

export const ParrainageSlice = createSlice({
  name: "parrainages",
  initialState,
  reducers: {
    setListFieuls: (state, action) => {
      state.listFieuls = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listFieuls = null;
    },
  },
});

// export const { setListTransactions, reset } = ListTransactionsSlice.actions;
export default ParrainageSlice.reducer;

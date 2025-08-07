import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListStatistiques = createAction("statistiques/setListStatistiques");
export const reset = createAction("statistiques/reset");

const initialState = {
  listStatistiques: null,
};

export const StatistiquesSlice = createSlice({
  name: "statistiques",
  initialState,
  reducers: {
    setListStatistiques: (state, action) => {
      state.listStatistiques = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listStatistiques = null;
    },
  },
});

// export const { setListTransactions, reset } = ListTransactionsSlice.actions;
export default StatistiquesSlice.reducer;

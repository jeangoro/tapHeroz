import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListTransactions = createAction("comptes/setListTransactions");
export const reset = createAction("comptes/reset");

const initialState = {
  listTransactions: null,
};

export const ComptesSlice = createSlice({
  name: "comptes",
  initialState,
  reducers: {
    setListTransactions: (state, action) => {
      state.listTransactions = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listTransactions = null;
    },
  },
});

// export const { setListTransactions, reset } = ListTransactionsSlice.actions;
export default ComptesSlice.reducer;

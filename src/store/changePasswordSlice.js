import { createAction, createSlice } from "@reduxjs/toolkit";

export const setListQuestions = createAction("changePassword/setListQuestions");
export const setMyQuestion = createAction("changePassword/setMyQuestion");
export const reset = createAction("changePassword/reset");

const initialState = {
  listQuestions: null,
  myQuestion: null,
};

export const ChangePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    setListQuestions: (state, action) => {
      state.listQuestions = action.payload; // Immer allows direct mutation in reducers
    },

    setMyQuestion: (state, action) => {
      state.myQuestion = action.payload; // Immer allows direct mutation in reducers
    },

    reset: (state) => {
      state.listQuestions = null;
    },
  },
});

// export const { setListQuestions, reset } = ListQuestionsSlice.actions;
export default ChangePasswordSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const mainPopup = createSlice({
  name: 'mainPopup',
  initialState: {
    isMainPopup: false,
    isWord: '',
    isCollection: '',
    isFilter: []
  },
  reducers: {
    popup: (state, action) => {
      state.isMainPopup = true;
      state.isWord = (JSON.parse(localStorage.getItem('collection')).word[Math.floor(Math.random() * JSON.parse(localStorage.getItem('collection')).word.length)]);
      state.isFilter = (JSON.parse(localStorage.getItem('collection')).word);
      state.isCollection = JSON.parse(localStorage.getItem('collection'))
    },
    filterWord: (state, action) => {
      state.isWord = (state.isFilter[Math.floor(Math.random() * state.isFilter.length)]);
      state.isFilter = state.isFilter.filter((c) => c._id !== state.isWord._id);
    },
    replayFilterWord: (state, action) => {
      state.isFilter = (JSON.parse(localStorage.getItem('collection')).word);
    },
    closeMainPopup: (state, action) => {
      state.isMainPopup = false;
    },
  },
});

export const { popup, filterWord, replayFilterWord, closeMainPopup } = mainPopup.actions;
export default mainPopup.reducer;
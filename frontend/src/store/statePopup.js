import { createSlice } from "@reduxjs/toolkit";

const statePopup = createSlice({
  name: 'statePopup',
  initialState: {
    statePopupCategories: false,
    stateIsAllCategory: true,
    stateEditorBlok: false,
    stateChangeCategory: false,
  },
 
  reducers: {
    setPopupCategories: (state, action) => {
      state.statePopupCategories = !state.statePopupCategories;
    },

    setEditorBlok: (state, action) => {
      state.stateIsAllCategory = !state.stateIsAllCategory;
      state.stateEditorBlok = !state.stateEditorBlok;
    },

    setChangeCategory: (state, action) => {
      state.stateIsAllCategory = !state.stateIsAllCategory;
      state.stateChangeCategory = !state.stateChangeCategory;
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

export const { setPopupCategories, setEditorBlok, setChangeCategory } = statePopup.actions;
export default statePopup.reducer;
import { configureStore } from "@reduxjs/toolkit";
import WordReducer from './mainPopupDictionary';
import statePopup from "./statePopup";

export default configureStore({
  reducer: {
    WordReducer: WordReducer,
    statePopup: statePopup,
  }
})
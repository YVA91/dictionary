import { configureStore } from "@reduxjs/toolkit";
import WordReducer from './mainPopupDictionary';

export default configureStore({
  reducer: {
    WordReducer: WordReducer,
  }
})
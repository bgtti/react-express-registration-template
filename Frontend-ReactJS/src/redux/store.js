/**
 * ABOUT
 * This app is using Redux Toolkit.
 * @see https://redux-toolkit.js.org/introduction/getting-started
 */

import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
 reducer: {
  loader: loaderReducer,
  user: userReducer,
 }
})
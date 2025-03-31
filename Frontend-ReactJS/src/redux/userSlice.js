/**
 * ABOUT
 * User redux slice: controls whether user is logged into the app.
 * 
 * Important: 
 * Use the functions in reduxUtils.js to set the user state.
 * Do not set the userSlice directly: doing it using util functions will make debugging easier.
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 loggedIn: false,
 email: "",
 name: "",
}

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  setUser: (state, action) => {
   state.loggedIn = action.payload.loggedIn;
   state.email = action.payload.email;
   state.name = action.payload.name;
  },
  setUserLogout: (state) => {
   state.loggedIn = false;
   state.email = "";
   state.name = "";
  },
 }
});

const userReducer = userSlice.reducer;

export const { setUser, setUserLogout } = userSlice.actions;
export default userReducer;

/**
 * Example usage:
 * const userData = {
 *  email: "tom@email.com",
 *  name: "Tom",
 *  logedIn: true
 * }
 * dispatch(setUser(userData))
 */
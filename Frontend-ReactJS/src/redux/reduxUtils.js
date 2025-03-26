/**
 * ABOUT
 * use the functions herein to set or modify the user state
 * these functions should ideally be called from within api handlers: not from the components
 * this will make debugging easier by having only one source of truth!
 */
import { store } from "../store"
import { setUser, setUserLogout } from "../userSlice";

/**
 * Function saves user information to the redux user slice if the supplied data is valid.
 * Returns true and changes user.loggedIn status to true if the supplied data is valid.
 * Returns false and changes user.loggedIn status to false if the supplied data is invalid.
 * 
 * This effectively logs the user in or out of protected routes.
 * 
 * The function should be used to wrap around protected route elements in Router.jsx
 * 
 * @param {string} name //"John"
 * @param {string} email //"john@fakemail.com"
 * @returns {boolean}
 */
export function setReduxLogInUser(name, email) {

 let dataIsValid = (name !== "") && (email !== "");

 if (dataIsValid) {
  const userData = {
   name: name,
   email: email,
   loggedIn: true
  };
  store.dispatch(setUser(userData));
  return true;
 } else {
  console.error("Redux encountered an error: user data invalid")
  store.dispatch(setUserLogout());
  return false;
 }
}

/**
 * Function logs out user from redux store.
 * 
 * Accepts no parameters and returns a boolean indicating success.
 * 
 * @returns {boolean}
 */
export function setReduxLogOutUser() {
 store.dispatch(setUserLogout());
 return true;
}

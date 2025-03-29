import { api } from "../axios"
import { apiEndpoints } from "../apiEndpoints"
import { nameValidation, emailValidation, passwordValidation } from "../../utils/authUtils"

/**
 * Function makes api call to register user.
 * 
 * @param {object} data 
 * @param {string} data.name 
 * @param {string} data.email 
 * @param {string} data.password
 * @returns {Promise<object>} // with boolean response and string message
 */
export function signupUser(data = {}) {
  // checking if data was received correctly
  const name = data.name ? data.name : false;
  const password = data.password ? data.password : false;
  const email = data.email ? data.email : false;

  const errorResponse = {
    response: false,
    message: "Error: Invalid input."
  };

  if (!data.name || !data.email || !data.password) {
    console.error("One or more required fields missing.")
    return Promise.resolve(errorResponse)
  }

  // validating the input
  const nameIsValid = nameValidation(name);
  const passwordIsValid = passwordValidation(password);
  const emailIsValid = emailValidation(email);
  const dataIsValid = emailIsValid.response && passwordIsValid.response && nameIsValid.response;

  if (!dataIsValid) {
    console.error("One or more required fields failed validation.")
    return Promise.resolve(errorResponse)
  }

  let requestData = {
    "name": name,
    "email": email,
    "password": password,
  }

  // preparing the returned response
  let res = {
    response: false,
    message: "",
  }

  // making the request
  const signup = async () => {
    try {
      const response = await api.post(apiEndpoints.signup, requestData, {
        validateStatus: () => true //prevents Axios from throwing error is response status not 2XX
      })

      let responseStatus = response.status;

      switch (responseStatus) {
        case 200:
        case 201:
          res.response = true;
          res.message = ""
          break;
        case 400:
        case 401:
        case 409:
          res.message = response.data?.error || "Error: Registration failed.";
          break;
        default:
          res.message = "Error: Please refresh the page and try again."
          break;
      }
    }
    catch (error) {
      res.message = "Error: Please refresh the page and try again."
      console.warn(`Api handler signup encountered an error: ${error}`)
    }
    return res;
  }

  return signup();
};
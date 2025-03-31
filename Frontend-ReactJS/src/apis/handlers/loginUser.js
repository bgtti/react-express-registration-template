import { api } from "../axios"
import { apiEndpoints } from "../apiEndpoints"
import { emailValidation, passwordValidation } from "../../utils/authUtils"
import { setReduxLogInUser } from "../../redux/reduxUtils";

/**
 * Asynchronously makes an API call to request login authorization.
 * 
 * - On success:
 *    - Logs user information into the appropriate Redux store.
 *    - Returns `response: true`, `status: 200` for standard login 
 * - On failure:
 *   - Returns `response: false` with an appropriate error `status` and a `message` describing the failure.
 * 
 * @param {object} data # object containing the login data
 * @param {string} data.email # the user's email address.
 * @param {string} data.password # the user's password .
 * @param {boolean} data.remember # whether to save the cookie for 30 days .
 * @returns {Promise<object>} # with boolean "response", int "status", and string "message"
 * 
 * @example
 * //Input example:
 * const data = {
 *     email: "josy@example.com",
 *     password: "108854cd4b588sszb64010",
 * }
 * 
 * // Response from loginUser:
 * loginUser(requestData)
 *      .then(response => {
 *          console.log (response)
 * })
 * // a successfull response will yield:
 * {
        response: true,
        status: 200,
        message: ""
    }
    // an error response might yield:
    {
        response: false,
        status: 400,
        message: "Error: Failed to log in."
    }
 */
export function loginUser(data) {
    // checking if data was received correctly
    const email = data.email ? data.email : false;
    const password = data.password ? data.password : false;
    const remember = !!data.remember; //making sure a boolean is passed here

    const errorResponse = {
        response: false,
        status: 400,
        message: "Error: Invalid input."
    };

    if (!email || !password) {
        return Promise.resolve(errorResponse)
    };
    // double-checking the data
    const passwordIsValid = passwordValidation(password);
    const emailIsValid = emailValidation(email);
    const dataIsValid = emailIsValid.response && passwordIsValid.response;

    if (!dataIsValid) {
        return Promise.resolve(errorResponse)
    }

    let requestData = {
        "email": email,
        "password": password,
        "remember": remember
    }

    // preparing the returned response
    let res = {
        response: false,
        status: 400,
        message: ""
    }

    // making the request
    const logInRequest = async () => {
        try {
            const response = await api.post(apiEndpoints.login, requestData, {
                validateStatus: () => true //prevents Axios from throwing error is response status not 2XX
            });

            let responseStatus = response.request.status;

            switch (responseStatus) {
                case 200:
                    let userIsLoggedIn = setReduxLogInUser(
                        response.data.user.name,
                        response.data.user.email
                    )
                    res.response = userIsLoggedIn;
                    res.message = userIsLoggedIn ? "" : "Error: Registration failed."
                    break;
                case 400:
                case 401:
                case 403:
                    res.message = response.data?.error || "Error: Credentials invalid."
                    break;
                default:
                    res.message = "Error: Please refresh the page and try again."
                    break;
            }
        } catch {
            res.message = "Error: Please refresh the page and try again."
        }
        return res;
    }
    return logInRequest()
}
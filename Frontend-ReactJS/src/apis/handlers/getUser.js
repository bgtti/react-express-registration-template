import { api } from "../axios"
import { apiEndpoints } from "../apiEndpoints"
import { setReduxLogInUser } from "../../redux/reduxUtils";

/**
 * Asynchronously makes an API call to request user information.
 * 
 * - On success:
 *    - Logs user information into the appropriate Redux store.
 *    - Returns `response: true`, `status: 200` for standard login 
 * - On failure:
 *   - Returns `response: false` with an appropriate error `status` and a `message` describing the failure.
 * 
 * @returns {Promise<object>} # with boolean "response", int "status", and string "message"
 * 
 * @example
 * //Input example:
 * 
 * // Response from getUser:
 * getUser()
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
        message: "Error: failed to get user."
    }
 */
export function getUser() {

    // preparing the returned response
    let res = {
        response: false,
        status: 400,
        message: ""
    }

    // making the request
    const reqUserData = async () => {
        try {
            const response = await api.post(apiEndpoints.getUser, {
                validateStatus: () => true //prevents Axios from throwing error is response status not 2XX
            });

            let responseStatus = response.request.status;

            switch (responseStatus) {
                case 200:
                    let userIsLoggedIn = setReduxLogInUser(
                        response.data.user.name,
                        response.data.user.email
                    )
                    res.status = 200;
                    res.response = userIsLoggedIn;
                    res.message = userIsLoggedIn ? "" : "Error: failed to get user."
                    break;
                case 400:
                case 401:
                case 403:
                    res.message = response.data?.error || "Error: Unauthorized."
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
    return reqUserData()
}
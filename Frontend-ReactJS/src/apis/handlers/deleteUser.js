import { api } from "../axios"
import { apiEndpoints } from "../apiEndpoints"
import { passwordValidation } from "../../utils/authUtils"
import { setReduxLogOutUser } from "../../redux/reduxUtils";

/**
 * Function makes api call to delete the user's account.
 * 
 * @returns {Promise<object>} 
 * 
 * @example
 * 
 * // Response from deleteOwnAccount:
 * deleteOwnAccount()
 *      .then(response => {
 *          console.log (response)
 * })
 * // a successfull response will yield:
 * {
        response: true,
        message: ""
    }
    // an error response might yield:
    {
        response: false,
        message: "Error: Deletion failed."
    }
 */
export function deleteOwnAccount(data = {}) {

    const errorResponse = {
        response: false,
        message: "Error: Invalid input."
    };

    // // Check password
    // if (!data.password) { return Promise.resolve(errorResponse) }
    // const passwordIsValid = passwordValidation(data.password);
    // if (!passwordIsValid.response) { return Promise.resolve(errorResponse) }

    // //Prepare payload
    // let requestData = {
    //  "password": data.password
    // }

    // // preparing the returned response
    // let res = {
    //  response: false,
    //  message: ""
    // }

    // making the request
    const deleteUser = async () => {
        try {
            const response = await api.post(apiEndpoints.deleteAcct, {
                validateStatus: () => true //prevents Axios from throwing error is response status not 2XX
            })

            let responseStatus = response.request.status;

            switch (responseStatus) {
                case 200:
                    //User not logged out here: deletion page logs user out
                    res.response = true;
                    break;
                case 400:
                case 401:
                case 409:
                    res.message = "Error: Deletion failed."
                    break;
                default:
                    res.message = "Error: Please refresh the page and try again."
                    break;
            }
        }
        catch (error) {
            res.message = "Error: Please refresh the page and try again."
            // console.warn(`Api handler to delete account encountered an error: ${error}`)
        }
        return res;
    }

    return deleteUser();
};
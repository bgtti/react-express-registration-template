import { api } from "../axios"
import { apiEndpoints } from "../apiEndpoints"

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
export function deleteOwnAccount() {

    // making the request
    const deleteUser = async () => {
        // preparing the returned response
        let res = {
            response: false,
            message: ""
        }
        try {
            const response = await api.delete(apiEndpoints.deleteAcct, {
                validateStatus: () => true //prevents Axios from throwing error is response status not 2XX
            })

            let responseStatus = response.request.status;

            switch (responseStatus) {
                case 200:
                    //User not logged out here: deletion page logs user out using deleteUserLogout.js
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
            res.message = "Error: A error occurred. Please refresh the page and try again."
        }
        return res;
    }

    return deleteUser();
};
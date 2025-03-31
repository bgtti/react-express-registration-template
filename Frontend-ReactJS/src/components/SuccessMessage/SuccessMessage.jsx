import { PropTypes } from "prop-types";
import "./successMessage.css"

/**
 * Component returns a div that can be used for displaying success messages in components.
 * 
 * Requires one prop: message
 * 
 * @param {object} props
 * @param {string} props.message // error message to be shown to user
 * @returns {React.ReactElement}
 * 
 * @example
 * import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
 * let successMessage = "Signup successfull!" //==> param!
 * let showSuccess = true
 * //some code...
 * <div>
        <label htmlFor="email">Email:</label>
        <input
            //...etc
        />
    </div>
 * {showError && (
        <SuccessMessage message={successMessage} /> // this component!
    )}
    //rest of the return statement...
 */
function SuccessMessage(props) {
    const { message } = props;
    return (
        <div className="Main-Form-Success">
            <div>
                <p className="Main-Form-Success-Exclamation">!</p>
            </div>
            <div className="Main-Form-Success-Warning">
                <p>
                    <i>
                        <b>Success!</b>
                    </i>
                </p>
                <p>{message}</p>
            </div>
        </div>
    )
}
SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default SuccessMessage
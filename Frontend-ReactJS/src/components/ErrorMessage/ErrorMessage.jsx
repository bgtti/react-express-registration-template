import { PropTypes } from "prop-types";
import "./errorMessage.css"
import "./errorMessage.css"

/**
 * Component returns a div that can be used for displaying error messages in components.
 * 
 * Requires one prop: message (required) 
 * 
 * @visibleName Error Message
 * 
 * @param {object} props
 * @param {string} props.message // error message to be shown to user
 * @returns {React.ReactElement}
 * @example
 * import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
 * let errorMessage = "Email format not accepted." //==> param!
 * let showError = true
 * //some code...
 * <div>
        <label htmlFor="email">Email:</label>
        <input
            //...etc
        />
    </div>
 * {showError && (
        <ErrorMessage message={errorMessage} /> // this component!
    )}
    //rest of the return statement...
 */
function ErrorMessage(props) {
    const { message } = props;
    return (
        <div className="Main-Form-Error">
            <div>
                <p className="Main-Form-Error-Exclamation">!</p>
            </div>
            <div className="Main-Form-Error-Warning">
                <p>
                    <i>
                        <b>Error warning</b>
                    </i>
                </p>
                <p>{message}</p>
            </div>
        </div>
    )
}
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage
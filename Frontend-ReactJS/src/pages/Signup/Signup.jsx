import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { INPUT_LENGTH } from "../../../../generalConfig/constants.js";
import { setLoader } from '../../redux/loaderSlice.js';
import useIsComponentMounted from "../../hooks/useIsComponentMounted.js";
import { signupUser } from '../../apis/handlers/signupUser.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage.jsx';

/**
 * Component returns signup page.
 * 
 * @returns {React.ReactElement}
 */
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isComponentMounted = useIsComponentMounted();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //If successfull, success message displays and it navigates to Login page
  useEffect(() => {
    if (success !== '') {
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.newPassword
    }

    dispatch(setLoader(true));
    setError('');
    setSuccess('');

    signupUser(requestData)
      .then(res => {
        if (isComponentMounted) {
          if (res.response) { setSuccess("You will be re-directed to the login page..."); }
          else { setError(res.message); }
        }
      })
      .catch(error => { console.error("Error in signup function.", error); })
      .finally(() => { dispatch(setLoader(false)); })

  };

  return (
    <section className="Main-Section">

      {/* Metadata */}
      <title>Sign up</title>
      <meta name="description" content="Sign up" />

      {/* Component */}
      <div className="Main-Form-Container">
        <h1>Signup</h1>
        <br />
        <p>Fill in the form to create an account!</p>
        <br />

        {error && (
          <ErrorMessage message={error} />
        )}

        {success && (
          <SuccessMessage message={success} />
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <b>Name *</b>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              required
              minLength={INPUT_LENGTH.name.minValue}
              maxLength={INPUT_LENGTH.name.maxValue}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">
              <b>Email *</b>
            </label>
            <input
              autoComplete="email"
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              required
              minLength={INPUT_LENGTH.email.minValue}
              maxLength={INPUT_LENGTH.email.maxValue}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="new-password">
              <b>Password *</b>
            </label>
            <input
              autoComplete="new-password"
              type="password"
              name="newPassword"
              id="new-password"
              placeholder="Enter Password"
              required
              minLength={INPUT_LENGTH.password.minValue}
              maxLength={INPUT_LENGTH.password.maxValue}
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="repeat-password">
              <b>Repeat Password *</b>
            </label>
            <input
              autoComplete="new-password"
              type="password"
              name="repeatPassword"
              id="repeat-password"
              placeholder="Repeat Password"
              required
              minLength={INPUT_LENGTH.password.minValue}
              maxLength={INPUT_LENGTH.password.maxValue}
              value={formData.repeatPassword}
              onChange={handleChange}
            />
          </div>

          <p>
            By creating an account you agree to our{' '}
            <Link to="/terms">Terms & Conditions</Link>

          </p>

          <div>
            <button
              disabled={success == ! ''}
              type="submit"
            >Sign Up</button>
          </div>
        </form>

        <br />
        <br />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
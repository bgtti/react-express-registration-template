import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // if using react-router for internal routing
import { useDispatch } from "react-redux";
import { INPUT_LENGTH } from "../../../../generalConfig/constants.js";
import { setLoader } from '../../redux/loaderSlice.js';
import useIsComponentMounted from "../../hooks/useIsComponentMounted.js";
import { loginUser } from '../../apis/handlers/loginUser.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

/**
 * Component returns login page.
 * 
 * @returns {React.ReactElement}
 */
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isComponentMounted = useIsComponentMounted();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email: email,
      password: password,
      remember: remember
    }

    dispatch(setLoader(true));

    loginUser(requestData)
      .then(res => {
        if (isComponentMounted) {
          if (res.response) { navigate('/dashboard'); }
          else { setError(res.message); }
        }
      })
      .catch(error => { console.error("Error in login function.", error); })
      .finally(() => { dispatch(setLoader(false)); })

  };

  return (
    <section className="Main-Section">
      {/* Metadata */}
      <title>Login</title>

      {/* Component */}
      <div className="Main-Form-Container">
        <h1>Login</h1>
        <br />
        <br />
        <p>Welcome back!</p>
        <br />
        <br />

        {error && (
          <ErrorMessage message={error} />
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <b>Email *</b>
            </label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              type="text"
              placeholder="Enter Email"
              minLength={INPUT_LENGTH.email.minValue}
              maxLength={INPUT_LENGTH.email.maxValue}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">
              <b>Password *</b>
            </label>
            <input
              autoComplete="current-password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              minLength={INPUT_LENGTH.password.minValue}
              maxLength={INPUT_LENGTH.password.maxValue}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="Main-Form-Checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>

        <br />
        <br />
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
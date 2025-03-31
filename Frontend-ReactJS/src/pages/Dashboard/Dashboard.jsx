import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from '../../redux/loaderSlice.js';
import { logoutUser } from "../../apis/handlers/logoutUser"
import { deleteOwnAccount } from "../../apis/handlers/deleteUser"
import useIsComponentMounted from "../../hooks/useIsComponentMounted.js";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

/**
 * Component returns dashboard page.
 * 
 * Note a user can only access the dashboard page when the user is logged in.
 * This component is contained inside a protected route wrapper.
 * @see router/ProtectedRoute.jsx -> the wrapper through which this page is displayed.
 * 
 * @returns {React.ReactElement}
 */
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isComponentMounted = useIsComponentMounted();

  const user = useSelector((state) => state.user);

  const [error, setError] = useState('');

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(setLoader(true));

    logoutUser()
      .then(res => {
        if (isComponentMounted) {
          if (res.response) { navigate('/login'); }
          else { setError(res.message); }
        }
      })
      .catch(error => { console.error("Error in logout function.", error); })
      .finally(() => { dispatch(setLoader(false)); })

  };

  const handleDeleteAcct = async (e) => {
    e.preventDefault();

    dispatch(setLoader(true));

    deleteOwnAccount()
      .then(res => {
        if (isComponentMounted) {
          if (res.response) { navigate('/deletedAccount'); }
          else { setError(res.message); }
        }
      })
      .catch(error => { console.error("Error in delete account function.", error); })
      .finally(() => { dispatch(setLoader(false)); })

  };

  return (
    <section className="Main-Section">
      {/* Metadata */}
      <title>Dashboard</title>
      <meta name="robots" content="noindex, nofollow" />

      {/* Component */}
      <h1>Hi, {user.name} </h1>

      <div className="Main-Dashboard-Content">

        <p>
          This is your dashboard!
        </p>

        {error && (
          <ErrorMessage message={error} />
        )}

        <form action="/logout" method="POST" onSubmit={handleLogout}>
          <div>
            <button type="submit">Logout</button>
          </div>
        </form>

        <form action="/deleteAccount" method="DELETE" onSubmit={handleDeleteAcct}>
          <div>
            <button className="Main-Form-Delete-Btn" type="submit">Delete account</button>
          </div>
        </form>

      </div>

    </section>
  )
}

export default Dashboard
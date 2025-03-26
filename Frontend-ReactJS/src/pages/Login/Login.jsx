/*
TODO: implement axios
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [remember, setRemember] = useState(true);
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // if your backend sets cookies
    body: JSON.stringify({ email, password, remember }),
   });

   if (res.ok) {
    navigate('/dashboard'); // or wherever you want to redirect
   } else {
    const data = await res.json();
    setError(data?.error || 'Login failed.');
   }
  } catch (err) {
   setError('Something went wrong. Please try again.');
  }
 };

 return (
  <section className="Main-Section">
   <div className="Main-Form-Container">
    <h1>Login</h1>
    <br />
    <br />
    <p>Welcome back!</p>
    <br />
    <br />

    {error && (
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
       <p>{error}</p>
      </div>
     </div>
    )}

    <form onSubmit={handleSubmit}>
     <div>
      <label htmlFor="email">
       <b>Email *</b>
      </label>
      <input
       id="email"
       name="email"
       type="text"
       placeholder="Enter Email"
       minLength="3"
       maxLength="320"
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
       id="password"
       name="password"
       type="password"
       placeholder="Enter Password"
       minLength="8"
       maxLength="60"
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
     Don't have an account? <a href="/signup">Signup</a>
    </p>
   </div>
  </section>
 );
}

export default Login;
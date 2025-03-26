/*
TODO: implement axios
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  newPassword: '',
  repeatPassword: '',
 });
 const [error, setError] = useState('');
 const navigate = useNavigate();

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

  try {
   const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
     name: formData.name,
     email: formData.email,
     'new-password': formData.newPassword,
     'repeat-password': formData.repeatPassword,
    }),
   });

   if (res.ok) {
    navigate('/login');
   } else {
    const data = await res.json();
    setError(data?.error || 'Signup failed.');
   }
  } catch (err) {
   setError('Something went wrong. Please try again.');
  }
 };

 return (
  <section className="Main-Section">
   <div className="Main-Form-Container">
    <h1>Signup</h1>
    <br />
    <p>Fill in the form to create an account!</p>
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
      <label htmlFor="name">
       <b>Name *</b>
      </label>
      <input
       type="text"
       name="name"
       id="name"
       placeholder="Enter Name"
       required
       minLength="1"
       maxLength="100"
       value={formData.name}
       onChange={handleChange}
      />
     </div>

     <div>
      <label htmlFor="email">
       <b>Email *</b>
      </label>
      <input
       type="text"
       name="email"
       id="email"
       placeholder="Enter Email"
       required
       minLength="3"
       maxLength="320"
       value={formData.email}
       onChange={handleChange}
      />
     </div>

     <div>
      <label htmlFor="new-password">
       <b>Password *</b>
      </label>
      <input
       type="password"
       name="newPassword"
       id="new-password"
       placeholder="Enter Password"
       required
       minLength="8"
       maxLength="60"
       value={formData.newPassword}
       onChange={handleChange}
      />
     </div>

     <div>
      <label htmlFor="repeat-password">
       <b>Repeat Password *</b>
      </label>
      <input
       type="password"
       name="repeatPassword"
       id="repeat-password"
       placeholder="Repeat Password"
       required
       minLength="8"
       maxLength="60"
       value={formData.repeatPassword}
       onChange={handleChange}
      />
     </div>

     <p>
      By creating an account you agree to our{' '}
      <a href="/terms">Terms & Conditions</a>.
     </p>

     <div>
      <button type="submit">Sign Up</button>
     </div>
    </form>

    <br />
    <br />
    <p>
     Already have an account? <a href="/login">Login</a>
    </p>
   </div>
  </section>
 );
}

export default Signup;
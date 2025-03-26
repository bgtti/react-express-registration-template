// import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom/client'
// import Router from './router/Router.jsx'



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router />
//   </StrictMode>,
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <Router /> */}
//     <h1>hello</h1>
//   </React.StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Router from './router/Router.jsx'
import './assets/styles/resetCss.css'
import './assets/styles/main.css'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Router />
)
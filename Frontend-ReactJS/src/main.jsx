import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './router/Router.jsx'
import './assets/styles/resetCss.css'
import './assets/styles/main.css'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <Router />
  </Provider>
)
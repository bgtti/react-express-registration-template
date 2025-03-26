<div align="center">
  <br>
  <h1><b>Express + React App Registration Template</b></h1>
  <strong>React + Vite Front-end</strong>
</div>
<br>

<hr>

![Preview of app](public/images/readme/App_preview_gif.gif)
<hr>

# Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Code and organization](#code-and-organization)
- [The App](#the-app)
- [About and license](#about-and-license)
- [Versioning and external resources](#versioning-and-external-resources)
<br>

# Introduction

This is the React frontend for a full-stack registration and authentication app using React with Vite, React Router, and form handling with communication to an Express.js backend. This README file refers specifically to the functioning of the Frontend portion of the application.

This project contains the UI and styling for the following pages:
- Homepage
- Signup page
- Login page
- Dashboard page
- Terms and conditions page

Through the Dashboard the user may also:
- Logout
- Delete the account

This project is using the following extensions:
- React Router for routing
- Redux Toolkit for state management
- Axios for HTTP requests
- PropTypes to to validate props

# Installation

<details>
   <summary>1. Clone this repository</summary>

   >\
   > More information on how to clone this repository [available here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
   > then enter the frontend folder using:
   > ```pwsh
   >cd Frontend-ReactJS
   >```
   ><br/><br/>
</details>

<details>
   <summary>2. Install dependencies</summary>

   >\
   > Make sure you have NodeJS installed. You can then proceed to install dependencies with the command:
   >\
   > ```pwsh
   >npm install
   >```
   ><br/><br/>
</details>

<details>
   <summary>3. Create an env file</summary>

   >\
   > You can create a .env file in the root, the content should be similar to that of the .env.example file provided.
   > 
   > Do not forget to change the session secret key.
   ><br/><br/>
</details>

<details>
   <summary>4. Run the app</summary>

   >\
   >Start the react app with the command:
   > ```pwsh
   >npm run dev
   >```
   ><br/><br/>
</details>


# Code and organization

The main entry to the application is `main.jsx`, where the main css files are imported, and which will return the Router.

## router

This project uses the React Router library. It creates the App around it in `main.jsx`.
In the `router`directory, you will find the `Router.jsx` component, which imports all app pages and layout components (Header/Footer).

You can read more about the routing implementation used in this application from the documentation accessing the link: [click here](https://reactrouter.com/start/declarative/routing).

## assets

The assets directory contains all images, icons, general css files (imported into `main.jsx`), font files (this application uses Nunito and Melodrama fonts from [fontshare](https://www.fontshare.com)).

## components

The `components` directory contains the layout components `Header`and `Footer`, imported into the `Route`component. They also have their own css file in their respective folders.

## pages

Contains all website pages, such as homepage, terms and conditions, etc.
Each page has a folder containing it's jsx, and some main contain a specific css file (when the component requires specific styling).


# The App

...

## App versions

The React frontend was created in the App's version 3.

Prior versions use Express JS templates to display the UI.

## Error handling

Very basic server-side error handling was implemented in the forms.

![Preview of app error handling](public/images/readme/App_error_handling.jpg)

## Mobile version

Simple syting was added, with the attempt to build the app mobile-fist.
This could certainly be improved, especially given the fact no Javascript code was used in the front-end.

![Preview of app on mobile](public/images/readme/App_mobile.jpg)

# About and license

This is the third draft of an app template in React/Express. 

This is a personal project completed by the author, which you are welcome to use and modify at your discretion.

# Versioning and external resources

Version 1 of this project contains an Express JS-only app without a database.  It is still available in the branch named `version_1`.

Version 2 built on top of version 1 adds the database implementation (using MongoDB), some basic Jest/Supertest testing, and improvements in routes and folder structure. It is still available in the branch named `version_2`.

Version 3 introduces React for the frontend, separating the project into 2 separate folders: `Backend-ExpressJS`and `Frontend-ReactJS`. The frontend is independent from the backend, and can be used together or separately as a template for other projects.
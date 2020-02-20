import React from "react";
import { withRouter } from 'react-router-dom';
// Allows props.location, props.history to work without being wrapped in a Router
// Use outside of routes.js
import Header from "./Components/Header";
import AuthHeader from "./Components/AuthHeader";
import routes from './routes'
import "./App.css";

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === "/" ||
      props.location.pathname === "/register" ? (
        <>
        {/* These are JSX Fragments, a non-style Div */}
        {/* Like a packet in JSX since JSX returns can only return one components */}
          <AuthHeader />
          {routes}
        </>
      ) : (
        <>
          <Header />
          {routes}
        </>
      )}
    </div>
  );
}

export default withRouter(App);

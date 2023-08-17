import React from "react";
import PropTypes from "prop-types";

import { Switch, BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";

import { authProtectedRoutes, publicRoutes } from "./routes";

import Authmiddleware from "./routes/route";

import { initFirebaseBackend } from "./helpers/firebase_helper";
import VerticalLayout from "./components";
import NonAuthLayout from "./components";

import "./assets/scss/theme.scss";

import fakeBackend from "helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

const firebaseConfig = {
  apiKey: "AIzaSyApOYXLJ1jFQVu_g_qlJJLBV2mr88InXgA",
  authDomain: "gars9n-080523.firebaseapp.com",
  projectId: "gars9n-080523",
  storageBucket: "gars9n-080523.appspot.com",
  messagingSenderId: "442460433343",
  appId: "1:442460433343:web:91280b7fed3939e7e24f0a",
  measurementId: "G-6V81GWF6Z7",
};

initFirebaseBackend(firebaseConfig);

const App = (props) => {
  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (props.layout.layoutType) {
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);

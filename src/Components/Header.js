import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/logo.svg";
import logoLightSvg from "../../src/assets/images/logo-light.svg";
import ProfileMenu from "./TopbarDropdown/ProfileMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    tToggle(); // Call tToggle to handle sidebar visibility
  };

  const getToggleIconClass = () => {
    return isSidebarOpen ? "bx bx-chevron-right" : "bx bx-chevron-left";
  };

  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitFullscreenElement) {
        document.documentElement.webkitFullscreenElement(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const buttonStyle = {
    fontSize: "22px",
    backgroundColor: "rgb(42 48 66)",
    hover: "white",
    borderRadius: "50px",
    marginLeft: "15px",
    height: "auto",
    paddingTop: "5px",
    paddingLeft: "4px",
    marginTop: "auto",
    marginBottom: "auto",
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
              </Link>
            </div>
            {/* FIXME: */}
            <button
              style={buttonStyle}
              type="button"
              className="header-item"
              onClick={toggleSidebar}
              id="vertical-menu-btn"
            >
              <i
                className={`fa fa-fw ${getToggleIconClass()} transition-icon`}
              />
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

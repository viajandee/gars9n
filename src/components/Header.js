import { Link } from "react-router-dom";

import logo from "../../src/assets/images/logo.svg";
import logoLightSvg from "../../src/assets/images/logo-light.svg";

import ProfileMenu from './TopbarDropdown/ProfileMenu';

const Header = props => {

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement
    ) {
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

  return (
    <>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box d-lg-none d-md-block'>
              <Link to="/" className="logo logo-dark">
                <span className='logo-sm'>
                  <img src={logo} alt='' height='22' />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className='logo-sm'>
                  <img src={logoLightSvg} alt='' height='22' />
                </span>
              </Link>
            </div>
            <button
              type='button'
              onClick={() => {
                tToggle();
              }}
              className='btn btn-sm px-3 font-size-16 header-item'
              id='vertical-menu-btn'
            >
              <i className='fa fa-fw fa-bars' />
            </button>
          </div>
          <div className='d-flex'>
            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                onClick={() => {
                  toggleFullscreen();
                }}
                className='btn header-item noti-icon'
                data-toggle='fullscreen'
              >
                <i className='bx bx-fullscreen' />
              </button>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SidebarContent from './SidebarContents';

import logo from '../../src/assets/images/logo.svg';
import logoDark from '../../src/assets/images/logo-dark.png';
import logoLightSvg from '../../src/assets/images/logo-light.svg';
import logoLightPng from '../../src/assets/images/logo-light.png';

const Sidebar = props => {

  return(
    <>
      <div className='vertical-menu'>
        <div className='navbar-brand-box'>
          <Link to='/' className='logo logo-dark'>
            <span className='logo-sm'>
              <img src={logo} alt='' height='22' />
            </span>
            <span className='logo-lg'>
              <img src={logoDark} alt='' height='17' />
            </span>
          </Link>
          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="45" />
            </span>
          </Link>
        </div>
        <div data-simplebar className='h-100'>
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

export default Sidebar
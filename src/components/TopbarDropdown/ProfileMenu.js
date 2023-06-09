import { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

import user1 from '../../assets/images/users/avatar-6.jpg'

const ProfileMenu = props => {

  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setusername(obj.displayName);
    }
  }, [props.success]);

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className='d-inline-block'
      >
        <DropdownToggle
          className='btn header-item'
          id='page-header-user-dropdown'
          tag='button'
        >
          <img
            className='rounded-circle header-profile-user'
            src={user1}
            alt='Header Avatar'
          />
          <span className='d-none d-xl-inline-block ms-2 me-1'>{username}</span>
          <i className='mdi mdi-chevron-down d-none d-xl-inline-block' />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          <Link to='/profile' className='dropdown-item'>
            <i className='bx bx-user font-size-16 align-middle me-1' />
            <span>{props.t("Profile")}</span>
          </Link>
          <div className="dropdown-divider" />
          <Link to='/logout' className='dropdown-item'>
            <i className='bx bx-power-off font-size-16 align-middle me-1 text-danger' />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile || {};
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
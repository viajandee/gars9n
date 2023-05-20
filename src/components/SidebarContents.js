import SimpleBar from 'simplebar-react';

import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import MetisMenu from 'metismenujs';

const SidebarContent = props => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <>
      <SimpleBar className='h-100' ref={ref}>
        <div id='sidebar-menu'>
          <ul className='metismenu list-unstyled' id='side-menu'>
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to='/#'>
                <i className="bx bx-home"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Manage")} </li>
            <li>
              <Link to='/clients'>
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Clients")}</span>
              </Link>
              <Link to='/stores'>
                <i className="bx bx-store"></i>
                <span>{props.t("Stores")}</span>
              </Link>
              <Link to='/menus'>
                <i className="bx bx-food-menu"></i>
                <span>{props.t("Menus")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Utilities")} </li>
            <li>
              <Link to='/email'>
                <i className="bx bx-envelope"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <Link to='/generator'>
                <i className="bx bx-area"></i>
                <span>{props.t("QR Code Generator")}</span>
              </Link>
              <Link to='/reports'>
                <i className="bx bx-line-chart"></i>
                <span>{props.t("Reports")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Settings")} </li>
            <li>
              <Link to='/permissions'>
                <i className="bx bx-key"></i>
                <span>{props.t("Users & Access")}</span>
              </Link>
              <Link to='/preferences'>
                <i className="bx bx-cog"></i>
                <span>{props.t("Preferences")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
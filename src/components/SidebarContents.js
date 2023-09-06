import SimpleBar from "simplebar-react";

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import MetisMenu from "metismenujs";

const SidebarContent = (props) => {
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
            <li className='menu-title'>{props.t("Menu")} </li>
            <li>
              <Link to='/#'>
                <i className='bx bx-home'></i>
                <span>{props.t("Home")}</span>
              </Link>
            </li>
            <li className='menu-title'>{props.t("Manage")} </li>

            <li>
              <Link to='/clients-list'>
                <i className='bx bx-user-circle'></i>
                <span>{props.t("Clients")}</span>
              </Link>
            </li>

            <li>
              <Link to='/stores-grid'>
                <i className='bx bx-user-circle'></i>
                <span>{props.t("Stores")}</span>
              </Link>
            </li>

            <li>
              <Link to='/menus' className='has-arrow'>
                <i className='bx bx-store'></i>
                <span>{props.t("Food Menus")}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/menu-food-list'>{props.t("Foods List")}</Link>
                </li>
                <li>
                  <Link to='/menu-food-detail/1'>{props.t("Food Detail")}</Link>
                </li>
                <li>
                  <Link to='/menu-add-food'>{props.t("Add Food")}</Link>
                </li>
              </ul>
            </li>
            <li className='menu-title'>{props.t("Utilities")} </li>
            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-envelope'></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/email-inbox'>{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to='/email-read'>{props.t("Read Email")} </Link>
                </li>
                <li>
                  <Link to='/#'>
                    <span
                      className='badge rounded-pill badge-soft-success float-end'
                      key='t-new'>
                      {props.t("New")}
                    </span>
                    <span key='t-email-templates'>{props.t("Templates")}</span>
                  </Link>
                  <ul className='sub-menu'>
                    <li>
                      <Link to='/email-template-basic'>
                        {props.t("Basic Action")}
                      </Link>
                    </li>
                    <li>
                      <Link to='/email-template-alert'>
                        {props.t("Alert Email")}{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to='/generator'>
                <i className='bx bx-area'></i>
                <span>{props.t("QR Code Generator")}</span>
              </Link>
            </li>
            <li>
              <Link to='/reports'>
                <i className='bx bx-line-chart'></i>
                <span>{props.t("Reports")}</span>
              </Link>
            </li>
            <li className='menu-title'>{props.t("Settings")} </li>
            <li>
              <Link to='/#' className='has-arrow'>
                <i className='bx bx-key'></i>
                <span>{props.t("Users & Access")}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/add-admin'>{props.t("Add Admin")}</Link>
                </li>
              </ul>
              <Link to='/preferences'>
                <i className='bx bx-cog'></i>
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

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeTopbarTheme,
} from "../store/actions";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = props => {
  const dispatch = useDispatch();

  const {
    leftSideBarThemeImage,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    leftSideBarTheme
  } = useSelector(state => ({
    leftSideBarThemeImage: state.Layout.leftSideBarThemeImage,
    leftSideBarType: state.Layout.leftSideBarType,
    layoutWidth: state.Layout.layoutWidth,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
  }));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === 'default') {
      dispatch(changeSidebarType('condensed', isMobile));
    } else if (leftSideBarType === 'condensed') {
      dispatch(changeSidebarType('default', isMobile));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("vertical"));
  }, [dispatch]);

  useEffect(() => {
    if (leftSideBarTheme) {
      dispatch(changeSidebarTheme(leftSideBarTheme));
    }
  }, [leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (leftSideBarThemeImage) {
      dispatch(changeSidebarThemeImage(leftSideBarThemeImage));
    }
  }, [leftSideBarThemeImage, dispatch]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [layoutWidth, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [topbarTheme, dispatch]);

  return (
    <>
      <div id='layout-wrapper'>
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
        <div className='main-content'>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  location: PropTypes.object,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
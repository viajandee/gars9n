import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import {
  Input,
  Label,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMails as onGetMails } from "../../store/mails/actions";

const MailsList = () => {
  // Initialize Redux dispatch and state selector
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => ({
    mails: state.mails.mails,
  }));

  // eslint-disable-next-line no-unused-vars
  const [mailList, setMailList] = useState([]);
  const [folderMenu, setFolderMenu] = useState(false);
  const [tagMenu, setTagMenu] = useState(false);
  const [moreMenu, setMoreMenu] = useState(false);

  // Fetch emails when the component mounts
  useEffect(() => {
    dispatch(onGetMails());
  }, [dispatch]);

  // Function to mark/unmark an email as favorite
  const makeFav = (id) => {
    const allItems = [...mails];
    const itemIndex = allItems.findIndex((mail) => mail.id === id);
    allItems[itemIndex].fav = !allItems[itemIndex].fav;
    setMailList(allItems);
  };

  // Function to handle checkbox state change
  const handleChange = (e) => {
    const id = e.target.id;
    setMailList((prevState) => {
      return {
        ...prevState,
        list: prevState.mails.map((mail) =>
          mail.id === +id ? { ...mail, value: !mail.value } : mail
        ),
      };
    });
  };

  // Function to handle delete button click
  const handleClick = () => {
    setMailList((prevState) => {
      return {
        ...prevState,
        list: prevState.mails.filter((mail) => !mail.value),
      };
    });
  };

  return (
    <>
      {/* Toolbar */}
      <div className='btn-toolbar p-3' role='toolbar'>
        <div className='btn-group me-2 mb-2 mb-sm-0'>
          <Button>
            <i className='fa fa-index' />
          </Button>
          <Button type='button' color='primary'>
            <i className='fa fa-exclamation-circle' />
          </Button>
          <Button type='button' color='primary' onClick={handleClick}>
            <i className='far fa-trash-alt' />
          </Button>
        </div>

        {/* Folder Dropdown */}
        <Dropdown
          isOpen={folderMenu}
          toggle={() => {
            setFolderMenu(!folderMenu);
          }}
          className='btn-group me-2 mb-2 mb-sm-0'>
          <DropdownToggle className='btn btn-primary dropdown-toggle' tag='i'>
            <i className='fa fa-folder' />{" "}
            <i className='mdi mdi-chevron-down ms-1' />
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-end'>
            <DropdownItem to='#'>Update</DropdownItem>
            <DropdownItem to='#'>Social</DropdownItem>
            <DropdownItem to='#'>Team Manage</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Tag Dropdown */}
        <Dropdown
          isOpen={tagMenu}
          toggle={() => {
            setTagMenu(!tagMenu);
          }}
          className='btn group me-2 mb-2 mb-sm-0'>
          <DropdownToggle className='btn btn-primary dropdown-toggle' tag='i'>
            <i className='fa fa-tag' />
            <i className='mdi mdi-chevron-down ms-1' />
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-end'>
            <DropdownItem to='#'>Update</DropdownItem>
            <DropdownItem to='#'>Social</DropdownItem>
            <DropdownItem to='#'>Team Manage</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* More Dropdown */}
        <Dropdown
          isOpen={moreMenu}
          toggle={() => {
            setMoreMenu(!moreMenu);
          }}
          className='btn-group me-2 mb-2 mb-sm-0'>
          <DropdownToggle className='btn btn-primary dropdown-toggle' tag='div'>
            More <i className='mdi mdi-dots-vertical ms-2' />
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-end'>
            <DropdownItem to='#'>Mark as Unread</DropdownItem>
            <DropdownItem to='#'>Mark as Important</DropdownItem>
            <DropdownItem to='#'>Add to Tasks</DropdownItem>
            <DropdownItem to='#'>Add Star</DropdownItem>
            <DropdownItem to='#'>Mute</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Email List */}
      <ul className='message-list'>
        {map(mails, (mail, index) => (
          <li key={index}>
            {/* Checkbox, Title, and Favorite Icon */}
            <div className='col-mail col-mail-1'>
              <div className='checkbox-wrapper-mail'>
                <Input
                  type='checkbox'
                  id={index}
                  checked={false}
                  onChange={handleChange}
                />
                <Label htmlFor={index} className='toggle' checked={index} />
              </div>
              <Link to='#' className='title'>
                {mail.name}
              </Link>
              <span
                onClick={() => makeFav(mail.id)}
                className={
                  mail.fav === true
                    ? "star-toggle fas fa-star"
                    : "star-toggle far fa-star"
                }
              />
            </div>

            {/* Email Subject and Date */}
            <div className='col-mail col-mail-2'>
              <Link to='#' className='subject'>
                Hello –{" "}
                <span className='teaser'>
                  Trip home from Colombo has been arranged, then Jenna will come
                  get me from Stockholm. :)
                </span>
              </Link>
              <div className='date'>Mar 6</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

// Prop Types
MailsList.propTypes = {
  mails: PropTypes.array,
  onGetMails: PropTypes.func,
};

export default withRouter(MailsList);

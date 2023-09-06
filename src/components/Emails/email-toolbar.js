import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const EmailToolbar = () => {
  const [folderMenu, setFolderMenu] = useState(false);
  const [tagMenu, setTagMenu] = useState(false);
  const [moreMenu, setMoreMenu] = useState(false);

  return (
    <>
      <div className='btn-toolbar p-3' role='toolbar'>
        <div className='btn-group me-2 mb-2 mb-sm-0'>
          <Button type='button' color='primary'>
            <i className='fa fa-inbox' />
          </Button>
          <Button type='button' color='primary'>
            <i className='fa fa-exclamation-circle' />
          </Button>
          <Button type='button' color='primary'>
            <i className='far fa-trash-alt' />
          </Button>
        </div>
        <Dropdown
          isOpen={folderMenu}
          toggle={() => {
            setFolderMenu(!folderMenu);
          }}
          className='btn-group me-2 mb-2 mb-sm-0'>
          <DropdownToggle className='btn btn-primary  dropdown-toggle' tag='i'>
            <i className='fa fa-folder' />{" "}
            <i className='mdi mdi-chevron-down ms-1' />
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-end'>
            <DropdownItem to='#'>Updates</DropdownItem>
            <DropdownItem to='#'>Social</DropdownItem>
            <DropdownItem to='#'>Team Manage</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          isOpen={tagMenu}
          toggle={() => {
            setTagMenu(!tagMenu);
          }}
          className='btn-group me-2 mb-2 mb-sm-0'>
          <DropdownToggle className='btn btn-primary  dropdown-toggle' tag='i'>
            <i className='fa fa-tag' />{" "}
            <i className='mdi mdi-chevron-down ms-1' />
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu-end'>
            <DropdownItem to='#'>Updates</DropdownItem>
            <DropdownItem to='#'>Social</DropdownItem>
            <DropdownItem to='#'>Team Manage</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          isOpen={moreMenu}
          toggle={() => {
            setMoreMenu(!moreMenu);
          }}
          className='btn-group me-2 mb-2 mb-sm-0'>
          <DropdownToggle
            className='btn btn-primary  dropdown-toggle'
            tag='div'>
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
    </>
  );
};

export default EmailToolbar;

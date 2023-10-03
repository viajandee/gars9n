import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import avatar1 from "../../assets/images/users/avatar-6.jpg";

import { onAuthStateChanged } from "../../helpers/firebase_helper";

const CardUser = () => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [clients, setClients] = useState(null);

  const [settingsMenu, setSettingsMenu] = useState(false);
  const toggleSettings = () => {
    setSettingsMenu(settingsMenu);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await onAuthStateChanged();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Row>
        <Col sm='12'>
          <Card>
            <CardBody>
              <Row>
                <Col sm='4'>
                  <div className='d-flex'>
                    <div className='me-3'>
                      <img
                        src={avatar1}
                        alt=''
                        className='avatar-md rounded-circle img-thumbnail'
                      />
                    </div>
                    <div className='flex-grow-1 align-self-center'>
                      <div className='text-muted'>
                        <p className='mb-2'>Welcome to Gars9n Dashboard</p>
                        <h5 className='mb-1'>
                          {user ? user.firstName : ""}{" "}
                          {user ? user.lastName : ""}
                        </h5>
                        <p className='mb-0'>{user ? user.title : ""}</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm='4' className='align-self-center'>
                  <div className='text-lg-center mt-4 mt-lg-0'>
                    <Row>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Clients
                          </p>
                          <h5 className='mb-0'>
                            {clients ? clients.count : "0"}
                          </h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Total Branches
                          </p>
                          <h5 className='mb-0'>
                            {clients ? clients.count : "0"}
                          </h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Total Tables
                          </p>
                          <h5 className='mb-0'>
                            {clients ? clients.count : "0"}
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm='4' className='d-none d-lg-block'>
                  <div className='clearfix mt-4 mt-lg-0'>
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={toggleSettings}
                      className='float-end'>
                      <DropdownToggle tag='button' className='btn btn-primary'>
                        <i className='bx bxs-zap align-middle me-1' /> Quick
                        Actions
                      </DropdownToggle>
                      <DropdownMenu className='dropdown-menu-end'>
                        <DropdownItem href='#'>New Client</DropdownItem>
                        <DropdownItem href='#'>New Branch</DropdownItem>
                        <DropdownItem href='#'>New Menu</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardUser;

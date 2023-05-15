import { useState } from "react";
import { 
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from "reactstrap";

 import avatar1 from '../../assets/images/users/avatar-6.jpg'

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  const toggleSettings = () => {
    setSettingsMenu(settingsMenu)
  }

  return (
    <>
      <Row>
        <Col lg='12'>
          <Card>
            <CardBody>
              <Row>
                <Col lg='4'>
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
                        <h5 className='mb-1'>Fady Zaki</h5>
                        <p className='mb-0'>System Admin</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg='4' className='align-self-center'>
                  <div className='text-lg-center mt-4 mt-lg-0'>
                    <Row>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Clients
                          </p>
                          <h5 className='mb-0'>14</h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Total Branches
                          </p>
                          <h5 className='mb-0'>43</h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Total Tables
                          </p>
                          <h5 className='mb-0'>635</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg='4' className='d-none d-lg-block'>
                  <div className='clearfix mt-4 mt-lg-0'>
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={toggleSettings}
                      className='float-end'
                    >
                      <DropdownToggle tag='button' className='btn btn-primary'>
                        <i className='bx bxs-zap align-middle me-1' /> Quick Actions
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
  )
}

export default CardUser
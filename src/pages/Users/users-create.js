import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useState } from "react";
import classnames from "classnames";

import Breadcrumbs from "../../Components/Breadcrumbs";
import { Link } from "react-router-dom";

const UserCreate = () => {
  document.title = "Create New User | Gars9n - Digital Menu & Ordering System";

  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  return (
    <>
      <div className='page-content'>
        <Container fluid={true}>
          <Breadcrumbs title='Users & Access' BreadcrumbItem='New User' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <h4 className='card-title mb-4'>Create New User</h4>
                  <div className='wizard clearfix'>
                    <div className='steps clearfix'>
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1);
                            }}
                            disabled={!(passedSteps || []).includes(1)}>
                            <span className='number'>1.</span> User Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2);
                            }}
                            disabled={!(passedSteps || []).includes(2)}>
                            <span className='number'>2.</span> User Permissions
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3);
                            }}
                            disabled={!(passedSteps || []).includes(3)}>
                            <span className='number'>3.</span> Avatar
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4);
                            }}
                            disabled={!(passedSteps || []).includes(4)}>
                            <span className='number'>4.</span> Confirm Details
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className='content clearfix mt-4'>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              <Col lg='6'>
                                <div className='mb-3'>
                                  <Label for='basicpill-firstname-input1'>
                                    First name
                                  </Label>
                                  <Input
                                    type='text'
                                    className='form-control'
                                    id='basicpill-firstname-input1'
                                  />
                                </div>
                              </Col>
                              <Col lg='6'>
                                <div className='mb-3'>
                                  <Label for='basicpill-lastname-input1'>
                                    Last name
                                  </Label>
                                  <Input
                                    type='text'
                                    className='form-control'
                                    id='basicpill-lastname-input1'
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg='12'>
                                <div className='mb-3'>
                                  <Label for='basicpill-title-input1'>
                                    Title
                                  </Label>
                                  <Input
                                    type='text'
                                    className='form-control'
                                    id='basicpill-title-input1'
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg='6'>
                                <div className='mb-3'>
                                  <Label for='basicpill-email-input4'>
                                    Email
                                  </Label>
                                  <Input
                                    type='email'
                                    className='form-control'
                                    id='basicpill-email-input4'
                                  />
                                </div>
                              </Col>
                              <Col lg='6'>
                                <div className='mb-3'>
                                  <Label for='basicpill-phoneno-input3'>
                                    Phone number
                                  </Label>
                                  <Input
                                    type='text'
                                    className='form-control'
                                    id='basicpill-phoneno-input1'
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg='6'>
                                  <div className='mb-3'>
                                    <h5 className='font-size-14 mb-4'>
                                      User Permissions
                                    </h5>
                                    <div className='form-check mb-3'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='userRadio'
                                        id='userRadio'
                                        value='user'
                                        defaultChecked
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='userRadio'>
                                        User
                                      </label>
                                    </div>
                                    <div className='form-check mb-3'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='superUserRadio'
                                        id='superUserRadio'
                                        value='superuser'
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='superUserRadio'>
                                        Superuser
                                      </label>
                                    </div>
                                    <div className='form-check mb-3'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='adminRadio'
                                        id='adminRadio'
                                        value='admin'
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='adminRadio'>
                                        Administrator
                                      </label>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className='actions clearfix'>
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }>
                          <Link
                            to='#'
                            onClick={() => {
                              toggleTab(activeTab - 1);
                            }}>
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTab === 4 ? "next disabled" : "next"
                          }>
                          <Link
                            to='#'
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}>
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserCreate;

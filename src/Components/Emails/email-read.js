/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import Breadcrumb from "../Breadcrumbs";
import EmailSideBar from "./email-sidebar";
import EmailToolbar from "./email-toolbar";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";

const EmailRead = () => {
  document.title = "Inbox | Gars9n - React Admin & Dashboard Template";

  // Replay Button
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleReplyClick = () => {
    toggleModal();
  };

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb title='Email' BreadcrumbItem='Read Email' />
          <Row>
            <Col xs='12'>
              <EmailSideBar />
              <div className='email-rightbar mb-3'>
                <Card>
                  {/* Render Email Top Tool Bar */}
                  <EmailToolbar />
                  <CardBody>
                    <div className='d-flex mb-4'>
                      <img
                        className='d-flex me-3 rounded-circle avatar-sm'
                        src={avatar2}
                        alt='User Avatar'
                      />
                      <div className='flex-grow-1'>
                        <h5 className='font-size-14 mt-1'>Scott Median</h5>
                        <small className='text-muted'>support@domain.com</small>
                      </div>
                    </div>

                    <h4 className='mt-0 font-size-16'>
                      This Week's Top Stories
                    </h4>

                    <p>Dear Sir/Madam</p>
                    <p>
                      Praesent dui ex, dapibus eget mauris ut, finibus
                      vestibulum enim. Quisque arcu leo, facilisis in fringilla
                      id, luctus in tortor. Nunc vestibulum est quis orci varius
                      viverra. Curabitur dictum volutpat massa vulputate
                      molestie. In at felis ac velit maximus convallis.
                    </p>
                    <p>
                      Sed elementum turpis eu lorem interdum, sed porttitor eros
                      commodo. Nam eu venenatis tortor, id lacinia diam. Sed
                      aliquam in dui et porta. Sed bibendum orci non tincidunt
                      ultrices. Vivamus fringilla, mi lacinia dapibus
                      condimentum, ipsum urna lacinia lacus, vel tincidunt mi
                      nibh sit amet lorem.
                    </p>
                    <p>Best Regards,</p>
                    <p>Scott Median</p>
                    <Row>
                      <Col xl='3' xs='6'>
                        <Card>
                          <img
                            className='card-img-top img-fluid'
                            src={img4}
                            alt='Image 4'
                          />
                          <div className='py-2 text-center'>
                            <Link to='#' className='fw-medium'>
                              Download
                            </Link>
                          </div>
                        </Card>
                      </Col>
                      <Col xl='3' xs='6'>
                        <Card>
                          <img
                            className='card-img-top img-fluid'
                            src={img5}
                            alt='Image 5'
                          />
                          <div className='py-2 text-center'>
                            <Link to='#' className='fw-medium'>
                              Download
                            </Link>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                    <Link
                      to='#'
                      className='btn btn-outline-success mt-2'
                      onClick={handleReplyClick}>
                      <i className='mdi mdi-reply' />
                      Reply
                    </Link>
                    <Modal
                      isOpen={modal}
                      role='dialog'
                      autoFocus={true}
                      centered={true}
                      className='exampleModal'
                      tabIndex='-1'
                      toggle={toggleModal}>
                      <div className='modal-content'>
                        <ModalHeader toggle={toggleModal}>Reply</ModalHeader>
                        <ModalBody>
                          <form>
                            <div className='mb-3'>
                              <Input
                                name='From'
                                type='email'
                                className='form-control'
                                placeholder='From'
                                pattern='.*@.*'
                                required
                              />
                            </div>

                            <div className='mb-3'>
                              <Input
                                name='To'
                                type='email'
                                className='form-control'
                                placeholder='To'
                                pattern='.*@.*'
                                required
                              />
                            </div>

                            <div className='mb-3'>
                              <Input
                                type='text'
                                className='form-control'
                                placeholder='Subject'
                              />
                            </div>
                            <Editor
                              toolbarClassName='toolbarClassName'
                              wrapperClassName='wrapperClassName'
                              editorClassName='editorClassName'
                            />
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type='button'
                            color='secondary'
                            onClick={toggleModal}>
                            Close
                          </Button>
                          <Button type='button' color='primary'>
                            Send <i className='fab fa-telegram-plane ms-1'></i>
                          </Button>
                        </ModalFooter>
                      </div>
                    </Modal>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmailRead;

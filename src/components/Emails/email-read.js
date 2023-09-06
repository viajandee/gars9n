import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import Breadcrumb from "../Breadcrumbs";
import EmailSideBar from "./email-sidebar";
import EmailToolbar from "./email-toolbar";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";

const EmailRead = () => {
  // Set document title
  document.title = "Inbox | Gars9n - React Admin & Dashboard Template";

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
                    <Link to='#' className='btn btn-outline-success mt-2'>
                      <i className='mdi mdi-reply' />
                      Reply
                    </Link>
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

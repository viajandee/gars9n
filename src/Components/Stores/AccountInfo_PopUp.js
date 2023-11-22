import React, { useState } from "react";
import Breadcrumbs from "../../Breadcrumbs";
import {
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "reactstrap";

const AccountInfoPopup = () => {
  const [modal_center, setmodal_center] = useState(false);

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_center() {
    setmodal_center(!modal_center);
    removeBodyCss();
  }
// in popup for example: firstname: {customer.name}
  return (
    <React.Fragment>
      <div>
        <Container>
          <Breadcrumbs />
          <Row>
            <Col lg='6'>
              <Card>
                <CardBody>
                  <CardTitle>pop-up</CardTitle>
                  <div>
                    <button
                      type='button'
                      className='btn btn-primary '
                      onClick={() => {
                        tog_center();
                      }}>
                        {/* store name: here */}
                      Center modal 
                    </button>
                    <Modal
                      isOpen={modal_center}
                      toggle={() => {
                        tog_center();
                      }}
                      centered>
                      <div className='modal-header'>
                        <h5 className='modal-title mt-0'>Center Modal</h5>
                        <button
                          type='button'
                          onClick={() => {
                            setmodal_center(false);
                          }}
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        <p>
                          Cras mattis consectetur purus sit amet fermentum. Cras
                          justo odio, dapibus ac facilisis in, egestas eget
                          quam. Morbi leo risus, porta ac consectetur ac,
                          vestibulum at eros.
                        </p>
                        <p>
                          Praesent commodo cursus magna, vel scelerisque nisl
                          consectetur et. Vivamus sagittis lacus vel augue
                          laoreet rutrum faucibus dolor auctor.
                        </p>
                        <p className='mb-0'>
                          Aenean lacinia bibendum nulla sed consectetur.
                          Praesent commodo cursus magna, vel scelerisque nisl
                          consectetur et. Donec sed odio dui. Donec ullamcorper
                          nulla non metus auctor fringilla.
                        </p>
                      </div>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AccountInfoPopup;

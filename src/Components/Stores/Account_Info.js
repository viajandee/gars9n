// import React, { useState, useEffect } from "react";

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Input,
  Label,
  Table,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import {  } from "../../helpers/firebase_helper";

const AccountInfo = () => {
  document.title = "Account Info | Gars9n - Digital Menu & Ordering System";

  


  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Store Grid' BreadcrumbItem='Account Info' />

          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <CardTitle>Basic Info</CardTitle>
                {/* form with edit */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;

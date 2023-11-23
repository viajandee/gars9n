import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import {} from "../../helpers/firebase_helper";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddAccount = () => {
  document.title = "Add Account Info | Gars9n - Digital Menu & Ordering System";

  // under construction




  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Store Grid' BreadcrumbItem='Add Account' />

          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4'>Basic Info</CardTitle>
                  <Form>
                    <Row>
                      <Col sm='6'>
                        <div className='form-floating mb-3'>
                          <input
                            type='text'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your First Name'
                            required='required'
                            title='Please Your First Name'
                          />
                          <Label htmlFor='floatingnameInput'>First Name</Label>
                        </div>
                        <div className='form-floating mb-3'>
                          <input
                            type='text'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your Last Name'
                            required='required'
                            title='Please Your Last Name'
                          />
                          <Label htmlFor='floatingnameInput'>Last Name</Label>
                        </div>

                        <div className='form-floating mb-3'>
                          <input
                            type='email'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Valid Email'
                            required='required'
                            title='Please Valid Email With @'
                          />
                          <Label htmlFor='floatingnameInput'>
                            Email address
                          </Label>
                        </div>
                        <div className='form-floating mb-3'>
                          <input
                            type='number'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your Phone Number'
                            required='required'
                            title='Please Enter Only Number'
                          />
                          <Label htmlFor='floatingnameInput'>
                            Phone Number
                          </Label>
                        </div>
                      </Col>

                      <Col sm='6'>
                        <div className='form-floating mb-3'>
                          <input
                            type='text'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your Street address'
                            required='required'
                            title='This field is required'
                          />
                          <Label htmlFor='floatingnameInput'>
                            Street address
                          </Label>
                        </div>

                        <div className='form-floating mb-3'>
                          <input
                            type='text'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your City'
                            required='required'
                            title='This field is required'
                          />
                          <Label htmlFor='floatingnameInput'>City</Label>
                        </div>
                        <div className='form-floating mb-3'>
                          <input
                            type='text'
                            // value={storeName}
                            // onChange={(e) => setStoreName(e.target.value)}
                            className='form-control'
                            id='floatingnameInput'
                            placeholder='Enter Your Country'
                            required='required'
                            title='This field is required'
                          />
                          <Label htmlFor='floatingnameInput'>Country</Label>
                        </div>

                        <div className='form-floating mb-3'>
                          <Input
                            id='floatingnameInput'
                            required='required'
                            className='form-control select2'
                            type='select'
                            // value={newEmail} 
                            // onChange={(e) => setNewEmail(e.target.value)}
                            placeholder='Please Select Gender'
                            title='This select is required'>
                            <option>Select Gender</option>
                            <option value=''>Male</option>
                            <option value=''>Female</option>
                          </Input>
                          <Label htmlFor='floatingnameInput'>Gender</Label>
                        </div>
                      </Col>
                    </Row>

                    <div>
                      <Button
                        style={{ marginRight: "7px" }}
                        type='submit'
                        className='btn-rounded '
                        color='btn btn-primary w-md'
                        // onClick={fun name}
                      >
                        Submit
                      </Button>

                      <Button
                        type='submit'
                        className='btn-rounded '
                        color='btn btn-danger w-md'
                        // onClick={() => setModalIsOpen(false)}
                      >
                        Clear
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddAccount;

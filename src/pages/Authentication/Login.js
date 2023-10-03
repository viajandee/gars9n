import PropTypes from "prop-types";
import React from "react";

import { withRouter, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Alert,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";

import * as Yup from "yup";
import { useFormik } from "formik";

import profile from "assets/images/profile-img.png";
import logo from "assets/images/users/avatar-6.jpg";

import { loginUser } from "../../store/actions";

const Login = (props) => {
  document.title = "Login | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  return (
    <>
      <div className='Home-btn d-none d-sm-block'>
        <Link to='/' className='text-dark'>
          <i className='fas fa-home h2' />
        </Link>
      </div>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} sm={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-primary bg-soft'>
                  <Row>
                    <Col xs={7}>
                      <div className='text-primary p-4'>
                        <h5 className='text-primary'>Welcome Back!</h5>
                        <p>Sign in to continue to Gars9n</p>
                      </div>
                    </Col>
                    <Col className='col-5 align-self-end'>
                      <img src={profile} alt='' className='img-fluid' />
                    </Col>
                  </Row>
                </div>
                <CardBody className='pt-0'>
                  <div>
                    <Link to='/' className='auth-logo-light'>
                      <div className='avatar-md profile-user-wid mb-4'>
                        <span className='avatar-title rounded-circle bg-light'>
                          <img
                            src={logo}
                            alt=''
                            className='rounded-circle'
                            height='72'
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className='p2'>
                    <Form
                      className='form-horizontal'
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      {error ? <Alert color='danger'>{error}</Alert> : null}
                      <div className='mb-3'>
                        <Label className='form-label'>Email</Label>
                        <Input
                          name='email'
                          className='form-control'
                          placeholder='Enter your email'
                          type='email'
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type='invalid'>
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className='mb-3'>
                        <Label className='form-label'>Password</Label>
                        <Input
                          name='password'
                          value={validation.values.password || ""}
                          type='password'
                          placeholder='Enter your password'
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type='invalid'>
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className='form-check'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          id='customerControlInline'
                        />
                        <Label
                          className='form-check-label'
                          htmlFor='customControlInline'>
                          Remember me
                        </Label>
                      </div>
                      <div className='mt-3 d-grid'>
                        <button
                          className='btn btn-primary btn-block'
                          type='submit'>
                          Log In
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p>
                  © {new Date().getFullYear()} Gars9n. Product of B.FM United
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Alert,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { useEffect } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerAdmin, apiError } from "../../store/actions";

const AdminCreate = (props) => {
  document.title = "Create New Admin | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter First Name"),
      lastName: Yup.string().required("Please Enter Last Name"),
      title: Yup.string().required("Please Enter Title"),
      company: Yup.string().required("Please Enter Company Name"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      password: Yup.string().required("Please Enter Password"),
      repassword: Yup.string()
        .required("Please Enter Password Again")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      dispatch(registerAdmin(values));
    },
  });

  const { admin, registrationError, loading } = useSelector((state) => ({
    admin: state.Account.admin,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <>
      <div className='page-content'>
        <Container fluid={true}>
          <Breadcrumbs title='Users & Access' BreadcrumbItem='New Admin' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <h4 className='card-title mb-4'>Create New Admin</h4>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                    {admin && admin ? (
                      <Alert color='success'>Admin added successfully!</Alert>
                    ) : null}

                    {registrationError && registrationError ? (
                      <Alert color='danger'>{registrationError}</Alert>
                    ) : null}

                    {loading ? <Spinner color='primary' /> : null}
                    <Row>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>First name</Label>
                          <Input
                            type='text'
                            className='form-control'
                            id='firstName'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstName || ""}
                            invalid={
                              validation.touched.firstName &&
                              validation.errors.firstName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstName &&
                          validation.errors.firstName ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.firstName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Last name</Label>
                          <Input
                            type='text'
                            className='form-control'
                            id='lastName'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastName || ""}
                            invalid={
                              validation.touched.lastName &&
                              validation.errors.lastName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastName &&
                          validation.errors.lastName ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.lastName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Title</Label>
                          <Input
                            type='text'
                            className='form-control'
                            id='title'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.title || ""}
                            invalid={
                              validation.touched.title &&
                              validation.errors.title
                                ? true
                                : false
                            }
                          />
                          {validation.touched.title &&
                          validation.errors.title ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Company Name</Label>
                          <Input
                            type='text'
                            className='form-control'
                            id='company'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.company || ""}
                            invalid={
                              validation.touched.company &&
                              validation.errors.company
                                ? true
                                : false
                            }
                          />
                          {validation.touched.company &&
                          validation.errors.company ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.company}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Email</Label>
                          <Input
                            type='email'
                            className='form-control'
                            id='email'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Phone number</Label>
                          <Input
                            type='text'
                            className='form-control'
                            id='phone'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Password</Label>
                          <Input
                            type='password'
                            className='form-control'
                            id='password'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
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
                      </Col>
                      <Col lg='6'>
                        <div className='mb-3'>
                          <Label className='form-label'>Repeat Password</Label>
                          <Input
                            type='password'
                            className='form-control'
                            id='repassword'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.repassword || ""}
                            invalid={
                              validation.touched.repassword &&
                              validation.errors.repassword
                                ? true
                                : false
                            }
                          />
                          {validation.touched.repassword &&
                          validation.errors.repassword ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.repassword}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <div>
                      <button type='submit' className='btn btn-primary w-md'>
                        Submit
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminCreate;
